import SpecialOfferCard, { SpecialOfferCardProps } from "../specialOfferCard/SpecialOfferCard"

const specialOffersArray: Array<SpecialOfferCardProps> = [
    {
        offerHeading: "רכשו iPhone 14 חדש החל מ-3,899 ש״ח בלבד!",
        offerText: "קנו עכשיו iPhone 14 חדש ותהנו ממגוון הטבות בהמשך קניתכם באתר ובעתיד",
        offerLinkTo: "/store/iphone/iPhone%2014",
        offerImage: "https://www.idigital.co.il/files/iphone14/kubiaiphe.jpeg",
        offerImageAlt: "iPhone 14"
    },
    {
        offerHeading: "הנחה מיוחדת לסטודנטים",
        offerText: "קבלו מאיתנו 3% הנחה קבועה על מחשבי MacBook לאורך כל השנה",
        offerLinkTo: "/store/mac",
        offerImage: "https://www.idigital.co.il/files/Students3/3student_lobby001.jpeg",
        offerImageAlt: "MacBook"
    },
    {
        offerHeading: "MacBook החל מ-199 ש״ח לחודש",
        offerText: "קונים מחשב Mac חדש בהוראת קבע מחוץ למסגרת האשראי וגם שנתיים אחריות",
        offerLinkTo: "/store/mac",
        offerImage: "https://www.idigital.co.il/files/dierct_debit/K_M_Mac001.png",
        offerImageAlt: "MacBook"
    },
    {
        offerHeading: "iPhone חדש קונים רק מהמומחים",
        offerText: "חושבים לקנות iPhone חדש? אל תתפשרו על פחות מהטובים ביותר.",
        offerLinkTo: "/store/iphone",
        offerImage: "https://www.idigital.co.il/files/totalpack/K_M_totalpack001.jpeg",
        offerImageAlt: "iPhone"
    }
]

const SpecialOffers = () => {
    return (
        <div className="special-offers page-container">
            {specialOffersArray.map((specialOffer, idx) => <SpecialOfferCard 
                key={idx}
                offerHeading={specialOffer.offerHeading}
                offerText={specialOffer.offerText}
                offerLinkTo={specialOffer.offerLinkTo}
                offerImage={specialOffer.offerImage}
                offerImageAlt={specialOffer.offerImageAlt}/>)}
        </div>
    )
}

export default SpecialOffers;