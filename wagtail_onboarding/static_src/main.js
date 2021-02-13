// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

import React, { useState } from 'react';
import Tour from 'reactour';

import homePageSteps from './steps/Home';
import getEditViewSteps from './steps/EditView';

function setMainMenuItems() {
    // Set menu item IDs dynamically because they aren't unique in the DOM.
    // We loop through these to make then unique based on their English text.
    const menuItems = document.querySelectorAll('.nav-main .menu-item');
    menuItems.forEach(node => {
        const text = node.innerText.trim().toLowerCase();
        switch (text) {
            case 'pages':
            case 'images':
            case 'documents':
            case 'snippets':
                node.dataset.tourId = text;
                break;
        }
    });
}

function setSubMenuItems() {
    const submenuItems = document.querySelectorAll(
        '[data-nav-primary-submenu-trigger'
    );
    submenuItems.forEach(node => {
        const text = node.innerText.trim().toLowerCase();
        switch (text) {
            case 'reports':
            case 'settings':
                node.dataset.tourId = text;
                break;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setSubMenuItems();
    setMainMenuItems();
});

Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
};

function checkIfTourExists(page) {
    if (page === 'home') {
        return true;
    } else if (page.includes('pages/') && page.includes('/edit')) {
        return true;
    }
}

const HelpButton = ({ onClick, text }) => {
    return (
        <button className="wagtail-handlebars-support" onClick={onClick}>
            {text}
        </button>
    );
};

const App = () => {
    const [_, adminPage] = window.location.href.split(window.adminUrl, 2);

    const [isTourOpen, setIsTourOpen] = useState(false);
    const [getPage, setPage] = useState(!adminPage ? 'home' : adminPage);

    // Check if a tour exists for this page.
    // If it doesn't, return with nothing.
    if (!checkIfTourExists(getPage)) {
        return <></>;
    }
    let steps = [];
    if (getPage === 'home') {
        steps = homePageSteps('admin_tour');
    } else if (getPage.includes('pages/') && getPage.includes('/edit')) {
        steps = getEditViewSteps('page_edit_tour');
    }

    return (
        <>
            <HelpButton
                onClick={() => {
                    setIsTourOpen(true);
                }}
                text={'?'}
            />
            <Tour
                steps={steps}
                isOpen={isTourOpen}
                disableInteraction={true}
                onRequestClose={() => setIsTourOpen(false)}
                // lastStepNextButton={<button>Done! Let's start playing</button>}
                maskSpace={0}
                showNavigation={false}
                showNavigationNumber={false}
            />
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('wagtail-onboarding')
);
