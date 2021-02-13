# Wagtail Onboarding

Adds a tour guide to the Wagtail admin to help editors understand all their options, Wagtail features, and how to move around.

## Installation

1. `pip install wagtail-onboarding`
2. Add `wagtail_onboarding` to your `INSTALLED_APPS` in your settings files
3. `python manage.py migrate`

### How it works
This package relies on Reactour, an awesome React-based web tour.

There's some JavaScript that updates the DOM on the fly when pages are loaded to give them specific selectors.

### Known flaws
Working backwards in a tour tends to break things. There isn't logic for backwards steps built in yet. There's _some_ support but it's happenstance that it's there.

## Contributors
People who helped me solve some initial problems or provided awesome ideas that deserve credit.

- Steve Steinwand
- Phil Dexter
- Karl Hobley
- Josh Marantz


## TODOS:
- [ ] Need to add more tours. There's only two right now.
- [ ] Add backwards steps.
