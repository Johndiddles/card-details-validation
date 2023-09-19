import React, { useState } from "react";
import axios from "axios";
import { FormInput } from "./formInput";
import { toast } from "react-toastify";

type formDataType = {
  card_number: string;
  card_expiry: string;
  card_cvv: string;
};

type apiResponseType = {
  status: number;
  data: {
    status: "success" | "failed";
    message?: string;
    data?: { [key: string]: string };
  };
};

const PaymentForm = () => {
  const [formData, setFormData] = useState<formDataType>({
    card_number: "",
    card_expiry: "",
    card_cvv: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const splitCardPan = (inputString: string): string => {
    const splitParts = [];
    for (let i = 0; i < inputString.length; i += 4) {
      splitParts.push(inputString.slice(i, i + 4));
    }
    return splitParts?.join(" ");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prevValue = formData;
    const name = e.target.name;
    let value = e.target.value;

    switch (name) {
      case "card_number":
        value = value?.split(" ")?.join("");
        if (value?.length > 20 || isNaN(Number(value))) return;
        prevValue.card_number = value;
        break;

      case "card_expiry":
        if (
          value?.length > 5 ||
          isNaN(Number(value?.split("/")?.join(""))) ||
          value?.split("/")?.length > 2
        )
          return;
        else if (
          value?.length === 2 &&
          !(value.length < prevValue.card_expiry?.length)
        )
          prevValue.card_expiry = `${value}/`;
        else prevValue.card_expiry = value;
        break;

      case "card_cvv":
        if (value?.length > 4 || isNaN(Number(value))) return;
        prevValue.card_cvv = value;
        break;

      default:
        return;
    }

    return setFormData(() => ({ ...prevValue }));
  };

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url: string = "http://localhost:5501/pay";

    setIsSubmitting(true);
    try {
      const response: apiResponseType = await axios.post(url, formData);
      if (response?.status === 200) {
        toast.success("Success");
      }
      setIsSubmitting(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status === 400) {
        error?.response?.data?.message
          ?.split(", ")
          ?.map((message: string) => toast.error(message));
      } else {
        toast.error(
          "Sorry, we're unable to verify your card details at this time"
        );
      }

      setIsSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={handlePayment}
      className="min-w-[240px] max-w-[320px] flex flex-col gap-4 items-center bg-white shadow-lg py-8 px-5 rounded-lg"
    >
      <div className="pb-6 w-full">
        <h2 className="text-2xl font-bold">Pay with card</h2>
        <p className="text-sm">Enter your card details</p>
      </div>
      <FormInput
        label="Card Number"
        name="card_number"
        value={splitCardPan(formData?.card_number)}
        onChange={handleInput}
        placeholder="card number"
      />
      <div className="w-full flex gap-4">
        <FormInput
          label="Card Expiry"
          name="card_expiry"
          value={formData?.card_expiry}
          onChange={handleInput}
          placeholder="**/**"
        />
        <FormInput
          label="CVV"
          name="card_cvv"
          value={formData?.card_cvv}
          onChange={handleInput}
          placeholder="CVV"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-700 text-gray-50 hover:bg-blue-800 duration-300 w-full outline-blue-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Please wait..." : "Pay"}
      </button>
    </form>
  );
};

export default PaymentForm;
