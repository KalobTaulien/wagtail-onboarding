import { getCssSelector, finishTour } from '../Utils';

export default function getSteps(page) {
    const steps = [
        {
            content: () => {
                return (
                    <div>
                        I will guide you through your Wagtail CMS website. Hit{' '}
                        <code>esc</code> at any time to quit this tour.
                    </div>
                );
            }
        },
        {
            selector: '.logo',
            content: 'Click here at any time to get to your main page',
            roundedStep: true
        },
        {
            selector: '#menu-search-q',
            content: 'Search for pages, documents, images and users'
        },
        {
            selector: "[data-tour-id='pages']",
            stepInteraction: false,
            content:
                'All of your pages can be found in here. Pages are how you create visible content for your users'
        },
        {
            selector: "[data-tour-id='pages']",
            stepInteraction: false,
            content: () => {
                return (
                    <div>
                        Your pages are "nested". Meaning an About Us page would
                        live inside of your Home page.
                    </div>
                );
            }
        },
        {
            selector: '.explorer',
            stepInteraction: false,
            action: () => {
                document
                    .querySelector('.menu-item[data-explorer-menu-item] a')
                    .click();
            },
            content: () => {
                return (
                    <div>
                        When you open your Pages explorer, a slide out menu will
                        appear.
                    </div>
                );
            }
        },
        {
            selector: '.explorer',
            stepInteraction: false,
            content: () => {
                return (
                    <div>
                        This is where you will see all of your pages you've
                        created.
                    </div>
                );
            }
        },
        {
            selector: 'a.c-explorer__item__link',
            stepInteraction: false,
            content: () => {
                return (
                    <div>
                        Think of each Page as a "folder". You can have more
                        Pages inside of a page.
                        <br />
                        <br />
                        If you wanted to see which pages exist inside of this
                        page (called child pages), you can click the name of the
                        page.
                    </div>
                );
            }
        },
        {
            selector:
                'a.c-explorer__item__action.c-explorer__item__action--small',
            stepInteraction: false,
            content: () => {
                return (
                    <div>
                        If you want to jump directly to editing a page you can
                        click the edit icon.
                    </div>
                );
            }
        },
        {
            selector: "[data-tour-id='pages']",
            stepInteraction: false,
            action: () => {
                var clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent('mousedown', true, true);
                document.dispatchEvent(clickEvent);
            },
            content: () => {
                return (
                    <div>
                        You can click here to close the explorer at any time. Or
                        simply click outside of it and it will automatically
                        close for you.
                    </div>
                );
            }
        },
        {
            selector: "[data-tour-id='images']",
            content:
                'Your can upload and manage your images very easily with Wagtail CMS. You can even group them in a folder called a "collection" and add tags.'
        },
        {
            selector: "[data-tour-id='documents']",
            content:
                'You can upload misc. files to your website too. Here you can organize your documents using tags.'
        },
        {
            selector: "[data-tour-id='reports']",
            action: node => {
                node.click();
            },
            content: () => {
                return (
                    <div>
                        View your site history, which pages are locked, workflow
                        states and workflow tasks.
                    </div>
                );
            }
        },
        {
            selector: '.submenu-active .nav-submenu',
            content: () => {
                return (
                    <div>This is where you can find all your site reports.</div>
                );
            }
        },
        {
            selector: "[data-tour-id='settings']",
            action: node => {
                var clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent('mousedown', true, true);
                document.dispatchEvent(clickEvent);

                node.click();
            },
            content: () => {
                return (
                    <div>
                        View your entire site settings including workflows,
                        users, groups, sites, collections and redirects.
                    </div>
                );
            }
        },
        {
            selector: '.submenu-active .nav-submenu__list',
            content: () => {
                return (
                    <div>
                        Depending on your account permissions, you can manage
                        features such as: Workflows, Workflow tasks, Users,
                        Groups, Sites, Collections, Redirect and custom site
                        settings.
                        <br />
                        <br />
                        But that depends on your account permissions which is in
                        place for website security.
                    </div>
                );
            }
        },
        {
            selector: '#account-settings',
            action: node => {
                // Close other submenus if any are open
                var clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent('mousedown', true, true);
                document.dispatchEvent(clickEvent);
            },
            content: () => {
                return (
                    <div>
                        You can edit your account settings in here. These are
                        not your site settings, these are your personal account
                        settings.
                    </div>
                );
            }
        },
        {
            action: () => {
                document
                    .querySelector('nav.nav-main')
                    .classList.add('nav-main--open-footer');
            },
            content: () => {
                return (
                    <div>
                        Remember: your personal account settings and the site
                        settings are different. They have a similar name, but
                        serve two very different purposes.
                    </div>
                );
            }
        },
        {
            selector: 'li#footer',
            content: () => {
                return (
                    <div>
                        You can access your account settings and change your
                        avatar, password, email address and more. Or you can log
                        out.
                    </div>
                );
            }
        },
        {
            selector: '.wagtail-handlebars-support',
            content:
                "Thank you for taking the tour. Whenever you see this icon at the bottom right of your page that means there's a guided tour available.",
            roundedStep: true,
            action: () => {
                // Only finish the tour on the last step. Don't finish the tour when the user exits the tour early.
                finishTour(page);
            }
        }
    ];

    // If there are snippets, tour the snippets menu
    if (document.querySelector('[data-tour-id="snippets"]')) {
        steps.insert(12, {
            selector: '[data-tour-id="snippets"]',
            content:
                "Snippets are re-usable pieces of information. Used most often in scenarios like selecting an Author for a Blog Post this way you don't need to edit the same information more than once."
        });
    }

    if (document.querySelector('ul.stats')) {
        steps.insert(steps.length - 1, {
            // Insert before the last step
            selector: 'ul.stats',
            content: 'These are some quick-stats for your website.'
        });
        if (document.querySelector('ul.stats li a')) {
            if (
                document
                    .querySelector('ul.stats li a')
                    .innerText.trim()
                    .includes('Page')
            ) {
                steps.insert(steps.length - 1, {
                    // Insert before the last step
                    selector: 'ul.stats li',
                    content:
                        'For example, this shows you how many pages you have. Outside of the tour, you can click this number to start viewing your page hierarchy.'
                });
            }
        }
    }

    if (document.querySelector('#onboarding-status')) {
        steps.insert(steps.length - 1, {
            // Insert before the last step
            selector: '#onboarding-status',
            action: node => {
                const jsProgressBar = document.querySelector(
                    '.js-onboarding-progress'
                );
                const initialValue = jsProgressBar.value;
                let increment = 3;
                const interval = setInterval(() => {
                    const newTotal = jsProgressBar.value + increment;
                    if (newTotal >= 100) {
                        increment = increment / -1;
                    }
                    jsProgressBar.value = newTotal;
                    if (newTotal <= initialValue) {
                        clearInterval(interval);
                    }
                }, 100);
            },
            content:
                'This is your onboarding progress. The more tours you complete, the fuller the bar will become. The goal: complete more tours to fill up this bar (and then it will go away).'
        });
    }

    if (document.querySelector('[data-upgrade]')) {
        steps.insert(steps.length - 1, {
            // Insert before the last step
            selector: '[data-upgrade] .help-block',
            content:
                "If you see this, that means there's a new version of the software running your website. Only a developer can update this."
        });
    }

    if (document.querySelector('section.object')) {
        const selectors = document.querySelectorAll(
            'section.object.collapsible'
        );
        selectors.forEach((section, i) => {
            const title = section
                .querySelector('.title-wrapper')
                .innerText.trim()
                .toLowerCase();
            const parentSelector = getCssSelector(section);
            if (title === 'your most recent edits') {
                steps.insert(steps.length - 1, {
                    // Insert before the last step
                    selector: parentSelector,
                    content: () => {
                        return (
                            <div>
                                This is where your most recent edits will
                                appear. This section won't show up if you don't
                                have any recently edited pages.
                            </div>
                        );
                    }
                });
            } else if (title === 'awaiting your review') {
                steps.insert(steps.length - 1, {
                    // Insert before the last step
                    selector: parentSelector,
                    content: () => {
                        return (
                            <div>
                                When a page is awaiting moderation that you're
                                able to grant, you can view them here. This
                                section won't show up if you don't have any
                                pages awaiting moderation.
                            </div>
                        );
                    }
                });
            } else if (title === 'your pages in a workflow') {
                steps.insert(steps.length - 1, {
                    // Insert before the last step
                    selector: parentSelector,
                    content: () => {
                        return (
                            <div>
                                When a page is part of a workflow you can see
                                them here. This section won't show up if you
                                don't have any pages in your workflow.
                            </div>
                        );
                    }
                });
            }
        });
    }

    return steps;
}
