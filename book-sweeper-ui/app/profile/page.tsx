// @flow
import * as React from 'react';

type Props = {

};

export default function Page(props: Props) {
    return (
        <div>
            <div role="tablist" className="tabs tabs-boxed">
                <a role="tab" className="tab">My books</a>
                <a role="tab" className="tab tab-active">Borrowed books</a>
                <a role="tab" className="tab">Returned books</a>
            </div>
        </div>
    );
};