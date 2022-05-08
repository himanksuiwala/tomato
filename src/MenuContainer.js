import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";

import { getStoreMenu } from "./features/store/storeSlice";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap');
</style>;
const MenuContainer = () => {
  useEffect(() => {
    // dispatch(fetchAsyncStoreMenu(id));
  }, []);
  const data = useSelector(getStoreMenu);
  console.table(data);
  return (
    <Container>
      <ContainerHeader>
        <div className="title">
          <span>Menu</span>
          <span className="logo">
            <MdRestaurantMenu />
          </span>
        </div>
      </ContainerHeader>
      <Menu>
        {data &&
          data.map((i) => {
            return (
              <>
                <MenuItem key={i._id}>
                  <div>
                    <div className="item-title">
                      <p>{i.name}</p>
                    </div>
                    {/* <div className="item-category">
                  <p>{i.cuisine_category}</p>
                </div> */}
                    <div className="item-description">
                      <p>{i.description}</p>
                    </div>
                  </div>
                  <div>
                    <div className="price">
                      <p>
                        ₹ {""}
                        {i.price}
                      </p>
                    </div>
                    <div className="qty">
                      <input type="text" defaultValue={1} />
                    </div>
                    <div className="cart">
                      <button>
                        <p>Add To Cart</p>{" "}
                      </button>
                    </div>
                  </div>
                </MenuItem>
                <hr />
              </>
            );
          })}
      </Menu>
    </Container>
  );
};
const MenuItem = styled.div`
  .qty {
    input {
      width: 40px;
    }
  }
  .cart {
    padding: 2px 0px 2px 0px;
  }
  padding: 25px 8px 25px 8px;
  display: flex;
  justify-content: space-between;
  .item-title {
    font-size: 22px;
    font-weight: 550;
  }
  .item-description {
    margin-top: 20px;
  }
`;
const ContainerHeader = styled.div``;
const Menu = styled.div`
  margin-top: 20px;
  margin-left: 5px;
`;
const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
  margin-left: 5px;
  font-family: "Inter", sans-serif;
  .title {
    font-weight: 500;
    font-size: 40px;
  }
  .logo {
    span {
      padding-top: 15px;
    }
  }
`;

export default MenuContainer;
