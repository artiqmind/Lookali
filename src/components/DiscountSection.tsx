import React from "react";

const offers = [
    {
        id: 1,
        title: "Save",
        highlight: "$29",
        desc: "Enjoy Discount all types of Grocery & frozen item",
        bgColor: "#F9E4D4", // cor sólida topo (exemplo laranja claro)
        iconUrl: "https://cdn.simpleicons.org/smashingmagazine/FF3E00", // exemplo SVG externo
        image:
            "https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
        id: 2,
        title: "Discount",
        highlight: "30%",
        desc: "Enjoy Discount all types of Grocery & frozen item",
        bgColor: "#F9E4D4",
        iconUrl: "https://cdn.simpleicons.org/lucide-react/06B6D4",
        image:
            "https://images.pexels.com/photos/1556707/pexels-photo-1556707.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
];

const PromoCards: React.FC = () => {
    return (
        <section className="bg-white py-12">
            <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className="rounded-xl overflow-hidden shadow-sm"
                        style={{ backgroundColor: offer.bgColor }}
                    >
                        {/* Topo colorido */}
                        <div className="p-6 flex justify-between items-start">
                            {/* Texto */}
                            <div>
                                <h3 className="text-lg font-bold text-[#7F3F00]">{offer.highlight}</h3>
                                <h4 className="text-sm font-semibold text-[#7F3F00] mt-1">{offer.title}</h4>
                                <p className="text-xs text-[#7F3F00] mt-1 max-w-[80%]">{offer.desc}</p>
                            </div>

                            {/* Ícone */}
                            <div>
                                <img src={offer.iconUrl} alt={offer.title + " icon"} className="w-6 h-6" />
                            </div>
                        </div>

                        {/* Imagem na parte de baixo */}
                        <div className="bg-white flex justify-center items-end p-4">
                            <img
                                src={offer.iconUrl}
                                alt={offer.title}
                                className="h-28 object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PromoCards;
