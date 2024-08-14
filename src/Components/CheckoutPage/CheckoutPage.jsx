import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useScrollOnMount from "src/Hooks/App/useScrollOnMount";
import useFormData from "src/Hooks/Helper/useFormData";
import { showAlert } from "../../Features/alertsSlice";
import PagesHistory from "../Shared/MiniComponents/PagesHistory/PagesHistory";
import BillingDetails from "./BillingDetails/BillingDetails";
import s from "./CheckoutPage.module.scss";
import PaymentSection from "./PaymentSection/PaymentSection";

const CheckoutPage = () => {
  useScrollOnMount(160);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { saveBillingInfoToLocal, cartProducts } = useSelector(
    (state) => state.products
  );
  const { values: billingValues, handleChange } = useFormData({
    initialValues: {
      firstName: "",
      companyName: "",
      address: "",
      streetAddress: "",
      cityOrTown: "",
      phoneNumber: "",
      email: "",
    },
    onSubmit: handleSubmitPayment,
    storeInLocalStorage: saveBillingInfoToLocal,
    localStorageKey: "billingInfo",
  });

  const pageHistory = [t("history.account"), t("history.checkout")];
  const historyPaths = [
    {
      index: 0,
      path: "/profile",
    },
  ];

  function handleSubmitPayment(e) {
    const isCartEmpty = cartProducts.length === 0
    const isInputFocused = document.activeElement.tagName === "INPUT"
    const isCheckboxFocused = document.activeElement.id === "save-info"

    e.preventDefault();
    if (isInputFocused && isCheckboxFocused) return

    if (!saveBillingInfoToLocal) localStorage.removeItem("billingInfo");

    if (isCartEmpty) {
      dispatch(
        showAlert({
          alertState: "warning",
          alertText: t("toastAlert.cartEmpty"),
          alertType: "alert",
        })
      );
      return;
    }

    // dispatch(transferData({ from: "cartProducts", to: "orderProducts" }));
    dispatch(
      showAlert({
        alertState: "success",
        alertText: "Test",
        alertType: "alert",
      })
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout</title>
        <meta
          name="description"
          content="Complete your purchase on Exclusive by reviewing your cart, adding your shipping details, and choosing payment options such as cash or bank card for a smooth checkout experience."
        />
      </Helmet>

      <div className="container">
        <main className={s.checkoutPage} id="checkout-page">
          <PagesHistory history={pageHistory} historyPaths={historyPaths} />

          <form
            method="POST"
            className={s.checkoutPageContent}
            onSubmit={handleSubmitPayment}
          >
            <BillingDetails inputsData={{ billingValues, handleChange }} />
            <PaymentSection />
          </form>
        </main>
      </div>
    </>
  );
};
export default CheckoutPage;
