// Pinched from https://stackoverflow.com/a/49663134/2074077. Love it this function, it "just works" <3
export const getCssSelector = el => {
    let path = [],
        parent;
    while ((parent = el.parentNode)) {
        path.unshift(
            `${el.tagName}:nth-child(${[].indexOf.call(parent.children, el) +
                1})`
        );
        el = parent;
    }
    return `${path.join(' > ')}`.toLowerCase();
};

export const finishTour = page => {
    fetch(window.onboardingTackingUrl, {
        method: 'PUT',
        body: JSON.stringify({
            tour: page
        })
    })
        .then(response => response.json())
        .then(data => {
            if (document.querySelector('.js-onboarding-progress')) {
                const progressBar = document.querySelector(
                    '.js-onboarding-progress'
                );
                progressBar.value = data.progress;
                progressBar.innerText = `${data.progress}%`;
            }
        });
};
