import React from "react";
import { useShoppingCart } from "../context/CartContext";
import CartItems from "./CartItems";
import fileContent from "../data/file.json";
import { CurrFormater } from "../utils/CurrFormater";

const Cart = ({ isOpen }) => {
  const { closeBar, items } = useShoppingCart();

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={closeBar}
          show={isOpen}
          className="fixed inset-0 backdrop:blur-md bg-opacity-30 flex justify-end bg-black"
        >
          <div className="bg-white w-[35%] pl-4 overflow-y-auto" onClick={handleModalClick} >
            <h1 className="mx-auto flex text-2xl font-bold mt-2 border-b-2 justify-center">
              Cart
            </h1>
            {items.map((item) => (
              <CartItems key={item.id} {...item} />
            ))}
            <div className="fixed bottom-0 text-2xl font-bold bg-white w-[30%]">
            Total:
            {CurrFormater(
              items.reduce((total, cartItem) => {
                const item = fileContent.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quant;
              }, 0)
            )}
            </div>
          </div>
        </div>
      )}
      {/* {isOpen && (
        <div
          className='fixed inset-0 bg-transparent'
          onClick={handleBackdropClick}
        />
      )} */}
    </>
  );
};

export default Cart;
