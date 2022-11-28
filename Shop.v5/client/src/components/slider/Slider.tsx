import { useEffect, useState } from "react";

const sliderImages: Array<string> = [
    "https://www.idigital.co.il/files/iPad_10generation/headerr__ipad1_002.jpeg",
    "https://www.idigital.co.il/files/iPad_10generation/headerr__ipad1_001.jpeg",
    "https://www.idigital.co.il/files/iphone14/header_iph14p_001.jpeg",
    "https://www.idigital.co.il/files/apple_watch_ultra/header__awultra1_001.jpeg",
    "https://www.idigital.co.il/files/iphone14/headers_launch_001.jpeg",
    "https://www.idigital.co.il/files/applewatch8/header_yaniv_003.jpeg",
    "https://www.idigital.co.il/files/applewatch8/header_yaniv_004.jpeg",
    "https://www.idigital.co.il/files/AirPods_Pro_2/headers_launch_002.jpeg"
];

const Slider = () => {
    const [sliderImage, setSliderImage] = useState<string>(sliderImages[0]);

    const sliderMotion = () => {
        let counter = 1;
        setInterval(() => {
            setSliderImage(sliderImages[counter]);
            counter++;
            if(counter === 8) {
                counter = 0;
            }
        }, 5000)
    }

    useEffect(()=> {
        sliderMotion();
    },[]);
    // TODO :
    // Logic of slider with buttons
    return (
        <div className="slider">
            <img src={sliderImage} alt="Slider Images" />
        </div>
    )
}

export default Slider