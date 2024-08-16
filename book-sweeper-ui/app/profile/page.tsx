"use client";

import { MyBooks } from './my-books';
import { MyBorrowedBooks } from './my-borrowed-books';
import { MyReturnedBooks } from './my-returned-books';
import {useState} from "react";

const tabs = [
    { index: 0, name: 'My books', component: () => <MyBooks /> },
    { index: 1, name: 'Borrowed books', component: () =>  <MyBorrowedBooks/> },
    { index: 2, name: 'Returned books', component: () =>  <MyReturnedBooks/> },
];


export default function Page() {
    const [activeTab, setActiveTab] = useState(tabs[0].index);

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