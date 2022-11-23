import CommercialCard, { CommercialCardPros } from "../commercialCard/CommercialCard";

const commercials: Array<CommercialCardPros> = [
    {
        commHeading: "הזמינו עכשיו את iPhone 14",
        commSubHeading: "הבטיחו לעצמכם את הדגם המועדף",
        commLinkTo: "/store/iphone",
        commImage: "https://www.idigital.co.il/files/Apple_Event_September_2022/iph14pro001.png"
    },
    {
        commHeading: "הזמינו עכשיו את Apple Watch Ultra",
        commSubHeading: "הזמינו עכשיו את השעון החדשני והעוצמתי ביותר של Apple עד היום",
        commLinkTo: "/store/apple_watch",
        commImage: "https://www.idigital.co.il/files/apple_watch_ultra/K_B_ultra_DESK2_001.png"
    }
]

const Commercials = () => {
    return (
        <div className="commercials page-container">
            {commercials.map((comm, idx) => <CommercialCard 
                key={idx}
                commHeading={comm.commHeading}
                commSubHeading={comm.commSubHeading}
                commLinkTo={comm.commLinkTo}
                commImage={comm.commImage} />)}
        </div>
    )
}

export default Commercials;