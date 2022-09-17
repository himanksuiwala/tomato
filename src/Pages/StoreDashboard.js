import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "react-spinkit";
import { useNavigate } from "react-router-dom";
import AddItemStore from "../Components/AddItemStore";
import useBackListener from "../utilities/useBackListener";
import { fetchAsyncStoreMenu } from "../features/store/storeSlice";
import {
  fetchAsyncStoreLogout,
  fetchAsyncStoreOrders,
  getStoreData,
} from "../features/store/userSlice";
import MenuContainer from "../Components/MenuContainer";
import OrderItemContainer from "./OrderItemContainer";
import useWindowDimensions from "../utilities/useWindowDimensions";

const StoreDashboard = () => {
  const dispatch = useDispatch();
  let defaultState = true;
  let navigate = useNavigate();
  const { height, width } = useWindowDimensions();
  const [ordersContainer, setOrdersContainer] = useState(false);
  const [accountContainer, SetaccountContainer] = useState(false);
  const [addItemInput, setAddItemInput] = useState(false);
  const [loading, setLoading] = useState(true);

  const store_data = useSelector(getStoreData);

  document.title = `Dashboard - ${
    store_data && store_data.checkforStore.store_name
  } 🍅`;
  useBackListener(({ location }) => {
    navigate("/", { replace: true });
  });

  const logOutHandler = async (e) => {
    dispatch(fetchAsyncStoreLogout(store_data.token));
    navigate("/", { replace: true });
  };
  const OrderclickHandler = async (e) => {
    setOrdersContainer(true);
    defaultState = false;
    SetaccountContainer(false);
  };
  const AccountclickHandler = async (e) => {
    SetaccountContainer(true);
    defaultState = false;
    setOrdersContainer(false);
  };
  const AddItemHandler = (e) => {
    {
      !addItemInput && setAddItemInput(true);
      addItemInput && setAddItemInput(false);
    }
  };
  const config = {
    headers: {
      Authorization: `Bearer ${store_data.token}`,
    },
  };
  useEffect(() => {
    dispatch(fetchAsyncStoreOrders(config));
    dispatch(fetchAsyncStoreMenu(store_data.checkforStore._id));
    setTimeout(() => setLoading(false), 2500);
  }, []);

  const fromChild = (data) => {
    if (data == "cancel") {
      AddItemHandler();
    }
  };
  while (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <Spinner name="wordpress" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }
  return (
    <Container>
      <AddItem>{addItemInput && <AddItemStore flag={fromChild} />}</AddItem>
      <Header>
        <h1>Dashboard</h1>
        <div className="logout" onClick={logOutHandler}>
          <h3>Logout</h3>
        </div>
      </Header>
      <UserContainer>
        {store_data.token && (
          <div className="sliced-name">
            {width > 455 ? (
              <>
                <span className="spa">Manage your </span>

                <span className="span">
                  {store_data.checkforStore.store_name}
                </span>
              </>
            ) : (
              <>
                <span className="spa">Manage your Restaurant </span>
              </>
            )}
          </div>
        )}
      </UserContainer>
      <BottomContainer>
        <OptionsContainer>
          <div onClick={OrderclickHandler} className="orders">
            <h1>Orders</h1>
          </div>
          <div onClick={AccountclickHandler} className="Account">
            <h1>Menu</h1>
          </div>
        </OptionsContainer>
        <hr />
        <Body>
          {ordersContainer ? (
            <MyOrders>
              <OrderItemContainer />
            </MyOrders>
          ) : (
            <AccountContainer>
              <h2 className="add-item" onClick={AddItemHandler}>
                {">"}Add Item
              </h2>
              <MenuContainer location={"store"} token={store_data.token} />
            </AccountContainer>
          )}
        </Body>
      </BottomContainer>
    </Container>
  );
};
const UserContainer = styled.div`
  padding: 7px;
  span {
    font-size: 18px;
  }
  .sliced-name {
    .span {
      font-size: 30px;
      font-weight: 600;
    }
  }
  @media screen and (max-width: 450px) {
    .sliced-name{
      .span{
        font-size:50px;
      }
    }
`;
const AddItem = styled.div``;
const AccountContainer = styled.div`
  .add-item {
    margin-left: 19px;
    margin-top: 5px;
  }
`;
const MyOrders = styled.div``;
const Body = styled.div``;
const OptionsContainer = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 10px;
  @media screen and (max-width: 450px) {
    h1 {
      font-size: 25px;
    }
  }
  .orders {
    margin: 0px 10px 0px 10px;
  }
  .Account {
    margin: 0px 10px 0px 10px;
  }
`;
const BottomContainer = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  .logout {
    margin-top: 10px;
    text-decoration: underline;
  }
  margin-top: 40px;
  h1 {
    font-size: 80px;
  }
  @media screen and (max-width: 450px) {
    h1 {
      font-size: 55px;
      font-weight: 650;
    }
`;
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  font-family: "Inter", sans-serif;

  @media screen and (min-width: 455px) {
    margin: 0 calc(12vw + 10px);
  }
  @media screen and (max-width: 450px) {
    margin: 0 calc(2vw + 5px);
  }
`;

export default StoreDashboard;