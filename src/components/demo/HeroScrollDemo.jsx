"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// Use existing product images as a collage inside the scroll card
import redVelvetRoses from "@/assets/images/products/red_velvet_roses.png";
import pinkRosesBouquet from "@/assets/images/products/pink_roses_bouquet.png";
import bluePurpleRoses from "@/assets/images/products/blue_purple_roses.png";
import sunlightBouquet from "@/assets/images/products/sunlight_bouquet.png";
import giftComboBox from "@/assets/images/products/gift_combo_box.png";
import heroBouquet from "@/assets/images/products/hero_bouquet.png";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h2
              className="text-4xl font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-black)",
              }}
            >
              Unveil the beauty of <br />
              <span
                className="text-4xl md:text-[6rem] font-bold mt-1 leading-none"
                style={{ color: "var(--color-primary)" }}
              >
                Handcrafted Bouquets
              </span>
            </h2>
          </>
        }
      >
        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-full w-full p-2 md:p-4">
          <div className="col-span-2 row-span-2 overflow-hidden rounded-xl">
            <img
              src={heroBouquet}
              alt="Luxury handcrafted eternal rose bouquet"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <div className="overflow-hidden rounded-xl">
            <img
              src={redVelvetRoses}
              alt="Red Velvet Roses"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <div className="overflow-hidden rounded-xl">
            <img
              src={pinkRosesBouquet}
              alt="Pink Roses Bouquet"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
