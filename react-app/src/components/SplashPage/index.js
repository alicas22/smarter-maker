
import SplashPageNav from '../SplashPageNav';
import image1 from "./images/image-1.jpg";
import image2 from "./images/image-2.jpg";
import image3 from "./images/image-3.jpg";
import image4 from "./images/image-4.jpg";
import image5 from "./images/image-5.jpg";
import image6 from "./images/image-6.jpg";
import image7 from "./images/image-7.jpg";
import image8 from "./images/image-8.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./SplashPage.css"

function SplashPage() {

    return (
        <>
            <div className="splash-page-container">
                <SplashPageNav />
                <div className='splash-page-carousel-container'>
                    <div className="splash-page-carousel-captions">
                        <div className="splash-page-header">Rise to <br/>your challenge.</div>
                        <div className="splash-page-subheader">
                            Flashcards for <div className='subheader-bold-text'>serious learners.</div>
                        </div>
                    </div>
                    <div className="splash-page-carousel">
                        <Carousel
                            interval={3000}
                            transitionTime={1000}
                            showArrows={false}
                            showStatus={false}
                            infiniteLoop
                            showThumbs={false}
                            autoPlay
                            stopOnHover={false}
                        >
                            <img src={image1} />
                            <img src={image2} />
                            <img src={image3} />
                            <img src={image4} />
                            <img src={image5} />
                            <img src={image6} />
                            <img src={image7} />
                            <img src={image8} />
                        </Carousel>

                    </div>
                </div>
            </div>
        </>
    )
}
export default SplashPage;
