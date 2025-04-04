import { motion } from "framer-motion";
import CupSize from "@/assets/icons/CupSize";
import { Options, Sizes } from "@/constants/Menu-options";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "@/redux/cartSlice";
import { RootState } from "@/store";
import PlusIcon from "@/assets/icons/PlusIcon";
import MinusIcon from "@/assets/icons/MinusIcon";
import { useEffect, useState } from "react";
import ChevronLeftIcon from "@/assets/icons/ChevronLeft";
import Header from "@/components/Header";

interface Product {
    id: number;
    imageUrl: string;
    description: string;
    name: string;
    price: number;
    category: string;
}

const ProductDetails = () => {
    const { control, watch, handleSubmit } = useForm({
        defaultValues: {
            size: "Medium",
            type: "",
        }
    });

    const location = useLocation();
    const Product: Product | null = location.state || null;


    const dispatch = useDispatch();

    const selectedSize = watch("size");
    const selectedOption = watch("type");

    const cart = useSelector((state: RootState) => state.cart.cart);
    const cartItem = cart.find((item) => item.id === Product?.id);


    const [totalPrice, setTotalPrice] = useState(Product?.price || 0);




    const handleAddToCart = () => {
        if (!Product) return;

        const productToAdd = {
            id: Product.id,
            name: Product.name,
            imageUrl: Product.imageUrl,
            description: Product.description,
            price: totalPrice,
            size: selectedSize,
            addOn: selectedOption,
            quantity: 1,
            category: Product.category
        };

        dispatch(addToCart(productToAdd));
    };




    useEffect(() => {
        if (!Product) return;


        const selectedOptionObj = Options.find(option => option.name === selectedOption);
        const selectedOptionPrice = selectedOptionObj ? selectedOptionObj.price : 0;


        setTotalPrice((Product?.price || 0) + selectedOptionPrice);
    }, [selectedOption, Product]);


    if (!Product) {
        return (
            <div className="text-center text-red-500 font-bold text-lg">
                Product not found!
            </div>
        );
    }



    return (
        <section>
            <Header
                link="/home"
                text={Product && Product.name}
            />
            <main className="p-5">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-background-white dark:bg-background-navygrey text-text-blackish dark:text-text-whitish h-auto w-full rounded-xl shadow-lg p-10'
                >
                    <form onSubmit={handleSubmit(handleAddToCart)} className="w-full flex space-x-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className=""
                        >
                            {Product && (
                                <img
                                    className="w-[9.688rem] h-[9.688rem] rounded-lg"
                                    src={Product.imageUrl}
                                    alt={Product.name}
                                />
                            )}
                        </motion.div>

                        <div className="flex w-[75%] flex-col">
                            <div>
                                <h1 className="text-[18px] font-bold">Description</h1>
                                <p className="text-[14px] mt-2">{Product?.description || "No description available."}</p>
                            </div>

                            {/* Choice of Size */}
                            <div className="mt-10">
                                <h1 className="text-[18px] font-bold">Choice of Size</h1>
                                <div className="flex items-center gap-5 mt-3">
                                    {Sizes.map((size, index) => (
                                        <Controller
                                            key={index}
                                            name="size"
                                            control={control}
                                            render={({ field }) => (
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="flex flex-col items-center cursor-pointer p-3"
                                                    onClick={() => field.onChange(size.name)}
                                                >
                                                    <motion.div
                                                        animate={{ scale: selectedSize === size.name ? 1.2 : 1 }}
                                                        className={`w-[3.674rem] flex items-center justify-center h-[3.674rem] transition-all rounded-lg ${selectedSize === size.name ? "border border-orange-500" : "hover:bg-gray-100"
                                                            }`}
                                                    >
                                                        <CupSize
                                                            width={size.name === "Small" ? 17 : size.name === "Medium" ? 24 : 29}
                                                            height={size.name === "Small" ? 17 : size.name === "Medium" ? 24 : 29}
                                                            className={`transition-all ${selectedSize === size.name ? "text-orange-500" : "text-gray-500"
                                                                }`}
                                                        />
                                                    </motion.div>
                                                    <span
                                                        className={`text-[12px] mt-2 ${selectedSize === size.name ? "text-orange-500 font-bold" : "text-gray-500"
                                                            }`}
                                                    >
                                                        {size.name}
                                                    </span>
                                                </motion.div>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Choice of Add On */}
                            <div className="mt-10">
                                <h1 className="text-[18px] font-bold">Choice of Add On</h1>
                                <div className="flex flex-col mt-5">
                                    {Options.map((option, index) => (
                                        <Controller
                                            key={index}
                                            name="type"
                                            control={control}
                                            render={({ field }) => (
                                                <motion.label
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`cursor-pointer px-3 rounded-lg flex justify-between items-center h-[3.448rem] transition-all ${selectedOption === option.name ? "border border-orange-500" : "hover:bg-gray-100"
                                                        }`}
                                                    onClick={() => field.onChange(option.name)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <motion.img
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                                            src={option.imageUrl}
                                                            alt={option.name}
                                                            className="w-8 h-8"
                                                        />
                                                        <span>{option.name}</span>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <span className="text-[14px]">+{option.price} LE</span>
                                                        <input {...field} type="radio" value={option.name} />
                                                    </div>
                                                </motion.label>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <hr />
                            </div>

                            {/* Total Price + Add to Cart */}
                            <div className="flex justify-between items-center mt-5">
                                <h2 className="text-[20px] font-bold">{totalPrice} LE</h2>

                                <div className="flex gap-10">
                                    {cartItem && (
                                        <div className="flex items-center gap-4">
                                            <span
                                                className="w-[2.821rem] cursor-pointer h-[2.821rem] border border-orange-500 rounded-full flex items-center justify-center text-orange-500 font-bold"
                                                onClick={() => dispatch(decreaseQuantity(Product.id))}
                                            >
                                                <MinusIcon />
                                            </span>
                                            <span className="text-[18px] font-bold">{String(cartItem.quantity).padStart(2, '0')}</span>
                                            <span
                                                className="w-[2.821rem] cursor-pointer h-[2.821rem] bg-orange-500 text-white rounded-full flex items-center justify-center font-bold"
                                                onClick={() => dispatch(increaseQuantity(Product.id))}
                                            >
                                                <PlusIcon />
                                            </span>
                                        </div>
                                    )}
                                    <button type="submit" className="w-[9.125rem] bg-[#ff8b43] h-[3.125rem] rounded-full text-[17px] text-white hover:bg-[#e67e34] transition-all">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </main>
        </section>
    );
};

export default ProductDetails;
