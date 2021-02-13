import { getCssSelector, finishTour } from '../Utils';


let privacyModalOpen = false;

export default function getSteps(page) {
    const steps = [
        {
            selector: ".breadcrumb",
            content: "This is your page breadcrumb. You can click the parent pages of this page to help you navigate to another page."
        },
        {
            selector: ".header-title",
            content: "This is your page title. If you update it and save your changes, this will change."
        },
        {
            selector: ".header-meta--status",
            content: "This is some meta data to help you understand the history of this page",
        },
        {
            selector: ".header-meta li:not(.header-meta--status)",
            content: "If you click this you can see your site history. This is really helpful if you have more than one person writing content on your website."
        },
        {
            selector: ".header-meta--type",
            content: "This is the page type. Different page types hold different editable content. For example, a contact page might have just a few data points you can edit, but an 'about us' page might have lots of content."
        },
        {
            selector: ".button--live",
            content: "If you ever want to see the live version of your page, you can always click this button. But note that this won't show you all your draft updates. For that, you'll want to click the 'Preview' button at the bottom of the page."
        },
        {
            selector: ".action-preview",
            content: "While you're making changes to your page, you can always preview you latest changes without having to save the page. This is helpful for seeing how your new content looks on a page."
        },
        {
            selector: ".actions--primary",
            content: "Every page has different actions. You can click the arrow to the right to expand on these options and select the one that's most suitable for you."
        },
        {
            selector: ".dropdown-toggle",
            content: "Clicking this arrow will display more options",
            action: node => {
                node.click()
            },
        },
        {
            selector: ".dropdown-button ul",
            content: "These are the options you can take. These may differ for certain users based on their group permissions."
        },
        {
            selector: "ul.tab-nav",
            content: "Tabs are a way to sort your content. Your main content will typically live under the 'Content' tab.",
            action: () => {
                document.querySelector(".dropdown-toggle").click()
            },
        },
        {
            selector: '[href="#tab-content"]',
            content: "If you ever want to see your main content, just click this tab.",
            action: node => {
                node.click()
            }
        },
        {
            selector: '[href="#tab-promote"]',
            content: "Your SEO settings live under the 'Promote' tab.",
            action: node => {
                node.click()
            }
        },
        {
            selector: '[href="#tab-settings"]',
            content: "In your settings tab you can tell a page to auto-publish and unpublish at a certain time. You can also control the privacy settings by making the page invisible to everybody except people with the password, people in a use group, logged in users, and more.",
            action: node => {
                node.click()
            }
        },
        {
            selector: '[href="#tab-content"]',
            content: "Let's go through your content tab first.",
            action: node => {
                node.click()
            }
        },
        {
            selector: 'ul.fields .field-content',
            content: "You can edit fields that have been 'exposed' to you as an editor. For example, this field is editable.",
            action: () => {
                // Add a hover event to `.object.full.title`
            }
        },
        // TODO: Add a help-text step. Requires :hover on `.object.full.title`
        // {

        // }
        {
            selector: '[href="#tab-promote"]',
            content: "Let's go through your promote tab next.",
            action: node => {
                node.click()
            }
        },
        {
            selector: 'li.slug_field',
            content: "A slug is your pages' link. For example, yourwebsite.com/this-is-my-slug/. You can change this at any time.",
        },
        {
            selector: '#id_seo_title',
            content: "This is not your page title that you'll see on the page. Instead, this is the title that most search engines will use. This content doesn't typically show up in the visual part of your website. This is up to your developer to implement.",
            position: 'top',
        },
        {
            selector: '[for="id_show_in_menus"]',
            content: "If checked, this page will show up in relevant menus across your website. This is up to your developer to implement",
            position: 'top',
        },
        {
            selector: '#id_search_description',
            content: "This is the search description a search engine could use to describe your page. This content doesn't typically show up in the visual part of your website. This is up to your developer to implement",
            position: 'top',
            action: () => {
                document.querySelector('[href="#tab-promote"]').click()
            }
        },
        {
            selector: '[href="#tab-settings"]',
            content: "Let's go through your settings tab next.",
            action: node => {
                node.click()
            }
        },
        {
            selector: "#id_go_live_at",
            content: "You can tell your website when to publish this page. This is an optional feature that your developers will need to implement - Wagtail simply provides a way for your developers to activate this feature easily. But it's still up to the developers to implement this properly."
        },
        {
            selector: "#id_expire_at",
            content: "You can tell your website when to unpublish this page. This is helpful for campaigns or pages that should only exist for a certain period of time. Like the previous step, this is also up to your developers to implement."
        },
        {
            selector: ".action-set-privacy",
            content: "You can change the privacy settings of your page at any time."
        },
        {
            selector: ".modal-body",
            content: "This is your page privacy window",
            action: () => {
                if(!privacyModalOpen) {
                    document.querySelector(".action-set-privacy").click()
                    privacyModalOpen = true;
                }
            }
        },
        {
            selector: ".modal-body .help-block",
            content: "Please take note that if you change this pages' privacy settings, all it's child pages will be affected as well. For example: if you changed yourwebsite.com/blog/ to be password protected then yourwebsite.com/blog/all-posts/ will be set to password protected as well."
        },
        {
            selector: ".modal-body .radio_select",
            content: "There are 4 options that come with your website. Pages are 'Public' by default. But you can change this as any time."
        },
        {
            content: "That's all there is for this tour. You should now be somewhat familiar with page editing inside of your website.",
            action: () => {
                // Close the modal.
                document.querySelector('[data-dismiss="modal"]').click()
                privacyModalOpen = false;
                finishTour(page)
            }
        }
    ]


    return steps;
}
