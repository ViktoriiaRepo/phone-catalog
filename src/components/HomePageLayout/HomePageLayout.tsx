import React, { useEffect, useState } from 'react';
import './HomePageLayout.scss';

import { HomeSlider } from '../HomeSlider';
import { CategoriesSection } from '../CategoriesSection';
import { ProductSlider } from '../ProductSlider';
import { getProducts } from '../../utils/fetchData';
import { Product } from '../../types/Product';

export const HomePageLayout: React.FC = () => {
  const [phonesWithHotPrices, setPhonesWithHotPrices] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);

  useEffect(() => {
    getProducts('./api/phones.json')
      .then(phones => {
        const hotPrices = phones
          .sort((a, b) => b.priceDiscount - a.priceDiscount)
          .slice(0, 12);

        const newPhones = phones.slice(0, 12);

        setPhonesWithHotPrices(hotPrices);
        setNewModels(newPhones);
      })
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  return (
    <div className="home home__grid">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
      <div className="home__slider">
        <HomeSlider />
      </div>
      <div className="home__brand-new-models">
        <ProductSlider products={newModels} title="Brand new models" />
      </div>
      <div className="home__shop-by-category">
        <CategoriesSection />
      </div>
      <div className="home__hot-prices">
        <ProductSlider products={phonesWithHotPrices} title="Hot prices" />
      </div>
    </div>
  );
};
