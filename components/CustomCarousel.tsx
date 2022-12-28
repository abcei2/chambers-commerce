
import { ReactNode } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const CustomCarousel = (props:{
    children:ReactNode
}) => {
    
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1550 },
            items: 3,
        },
        desktop: {
            breakpoint: { max: 1550, min: 1200 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1200, min: 800 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 800, min: 0 },
            items: 1
        }
    };

    return (
        
        <Carousel
            className=" "

            ssr responsive={responsive}
        >
            {props.children}

        </Carousel>
    )
}

export default CustomCarousel