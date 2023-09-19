import axios from "axios";
import { useState } from "react";
import { FormInput } from "./components/formInput/formInput";

type formDataType = {
  card_number: string;
  card_expiry: string;
  card_cvv: string;
};
function App() {
  const [formData, setFormData] = useState<formDataType>({
    card_number: "",
    card_expiry: "",
    card_cvv: "",
  });

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url: string = "http://localhost:5501/pay";
    const response = await axios.post(url, formData);
    console.log({ response });
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
        if (value?.length > 5 || isNaN(Number(value?.split("/")?.join(""))))
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

  return (
    <div className="min-h-[100vh] min-w-[100vw] flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handlePayment}
        className="min-w-[240px] max-w-[320px] flex flex-col gap-4 items-center bg-white shadow-lg py-8 px-5 rounded-lg"
      >
        <div className="pb-8 w-full">
          <h2 className="text-2xl font-bold">Pay with card</h2>
          <p className="text-sm">Enter your card details</p>
        </div>
        <FormInput
          label="Card Number"
          name="card_number"
          value={formData?.card_number}
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
          className="bg-blue-700 text-gray-50 hover:bg-blue-800 duration-300 w-full"
        >
          Pay
        </button>
      </form>
    </div>
  );
}

export default App;
