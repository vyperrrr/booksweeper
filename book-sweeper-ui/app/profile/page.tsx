"use client";

import * as React from 'react';
import { useOwnedBooks } from "@/lib/queries";
import { MyBooks } from './my-books';
import { BorrowedBooks } from './borrowed-books';
import { ReturnedBooks } from './returned-books';

const tabs = [
    { index: 0, name: 'My books', component: () => <MyBooks /> },
    { index: 1, name: 'Borrowed books', component: () =>  <BorrowedBooks/> },
    { index: 2, name: 'Returned books', component: () =>  <ReturnedBooks/> },
];


export default function Page() {
    const [activeTab, setActiveTab] = React.useState(tabs[0].index);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div>
            <div role="tablist" className="tabs tabs-boxed">
                {tabs.map((tab) => (
                    <a
                        key={tab.index}
                        role="tab"
                        className={`tab ${activeTab === tab.index ? 'tab-active' : ''}`}
                        onClick={() => handleTabClick(tab.index)}>
                        {tab.name}
                    </a>

                ))}
            </div>
            <div>
                {tabs[activeTab].component()}
            </div>
        </div>
    );
};