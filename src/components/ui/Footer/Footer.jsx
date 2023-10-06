import styles from "./Footer.module.css";
import amazon_pay from "../../../assets/images/footer/2560px-Amazon_Pay_logo.svg.png";
import american_express from "../../../assets/images/footer/American-Express-Logo-PNG-File.png";
import master_card from "../../../assets/images/footer/purepng.com-mastercard-logologobrand-logoiconslogos-251519938372dnf77.png";
import paypal from "../../../assets/images/footer/PayPal.svg.png";
import downloadAppStore from "../../../assets/images/footer/th1.png";
import downloadGooglePlay from "../../../assets/images/footer/th2.png";
import Button from "../Button/Button";

function Footer() {
  return (
    <footer className={styles.footer}>
      <section className="container">
        <h2>Get the FreshCart app</h2>
        <p>We'll send you a link, open it on your phone to download the app.</p>
        <form className="d-flex gap-2 gap-sm-4 flex-wrap flex-sm-nowrap">
          <input type="email" placeholder="Email" aria-label="Email" className="form-control" />
          <Button moreStyles={{ minWidth: "10rem" }}>Share App Link</Button>
        </form>
        <hr />
        <div className="links d-flex gap-5 gap-md-3 justify-content-between flex-wrap">
          <div className="partners d-flex gap-3 align-items-center">
            <h5>Payment Partners:</h5>
            <ul className="list-unstyled d-flex gap-1 gap-sm-3 align-items-center flex-wrap">
              <li>
                <img src={amazon_pay} alt="Amazon Pay" width="70px" />
              </li>
              <li>
                <img src={american_express} alt="American Express" width="70px" />
              </li>
              <li>
                <img src={master_card} alt="Master Card" width="70px" />
              </li>
              <li>
                <img src={paypal} alt="PayPal" width="70px" />
              </li>
            </ul>
          </div>
          <div className="download d-flex gap-1 align-items-center gap-sm-3 flex-wrap">
            <h5>Get Deliveries with FreshCart</h5>
            <div>
              <img src={downloadAppStore} alt="Download" style={{ width: "50%", maxWidth: "12rem" }} />
              <img src={downloadGooglePlay} alt="Download" style={{ width: "50%", maxWidth: "12rem" }} />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
