import "./Footer.css";

function Footer () {
    return (
        <footer>
            <div className="footer__wrapper">
                <span className="footer__desc">Created by J White</span>
                
                <span className="footer__enquiries">All enquiries, email: <a href="mailto:jackwhite230@gmail.com" className="footer__email">jackwhite230@gmail.com</a></span>
                
            </div>
        </footer>
    );
}

export default Footer;