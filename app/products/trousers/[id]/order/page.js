"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Loader from "@/components/Loader";

function QuickOrder() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams()
  const id = params.id

  // Form state
  const [email, setemail] = useState("")
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [district, setDistrict] = useState("");
  const [division, setDivision] = useState("");
  const [province, setProvince] = useState("");
  const [TID, setTID] = useState("");
  const [error, setError] = useState(true);
  const [quantity, setquantity] = useState("")
  const [product, setproduct] = useState({})
  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/order/getproducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id }),
        });
        const data = await res.json();
        console.log(id)
        if (data.success) {
          setproduct(data.product)
          console.log(data.product)
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [])



  useEffect(() => {
    if (status !== "loading" && !session) router.push("/signup");
  }, [session, status, router]);

  useEffect(() => {
    if (
      name &&
      phone &&
      village &&
      tehsil &&
      district &&
      division &&
      province &&
      TID
    ) {
      setError(false);
    } else {
      setError(true);
    }
  }, [name, phone, village, tehsil, district, division, province, TID]);

  if (status === "loading") return <Loader />;
  if (!session) return null;

  const handleQuickOrder = async (e) => {
    e.preventDefault();

    const orderData = {
      productId : id,
      name,
      phone,
      address: { village, tehsil, district, division, province },
      transactionId: TID,
      userEmail: email,
      quantity,
      
      cartItems: [
        {
          productId: id,


        },
      ],
      totalAmount: product.price,
    };

    try {
      const res = await fetch("/api/order/create-single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("✅ Order placed successfully!");
router.push("/")
      } else {
        toast.error("❌ " + data.message);
      }
    } catch (err) {
      toast.error("Error placing order: " + err.message);
    }
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mb-10 md:max-w-xl w-full mt-30">
        <h2 className="text-xl font-bold mb-4 text-black">Quick Order</h2>
        <p className="text-lg text-black">Please Enter following details to confirm your order
        </p>
        <p className="flex flex-col"><span className="font-bold text-black">Product Details</span>
          <span className="text-black">Product Title{product.title}</span>
          <span className="text-black">Price : Rs.{product.price}</span>
        </p>

        <form className="flex flex-col gap-3" onSubmit={handleQuickOrder}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />

          <input
            type="text"
            placeholder="Village/Town/City"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="Tehsil"
            value={tehsil}
            onChange={(e) => setTehsil(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="Division/City"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            min={"1"}
            value={quantity}
            onChange={(e) => setquantity(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <div className="text-black">
            Payment Method:
            COD (Cash on delivery)
            <div>
              Delivery Fee : PKR 300/-
            </div>
            <div>
              Payemnt Instruction:
              Pay the amount with help of Number 03006363964 Account Name:King . After your payment is done. You will get an Transiction ID. Enter Transaction ID to confirm your order. After verifying your Transaction ID You will receive an Email from us that your order is placed successfully and you will receive the anticipated date of order arrival in the Email.
            </div>
          </div>
          <input
            type="text"
            placeholder="Transaction ID (if paid)"
            value={TID}
            onChange={(e) => setTID(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
          />

          <button
            disabled={error}
            type="submit"
            className="mt-4 active:scale-95 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Buy Now
          </button>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}

export default QuickOrder;
