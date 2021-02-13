# Wagtail Onboarding

Adds a tour guide to the Wagtail admin to help editors understand all their options, Wagtail features, and how to move around.

> **WIP WARNING**: This is a work in progress and just slightly beyond a "proof of concept". If you run into bugs or interesting scenarios where the tour breaks, please open an Issue with as many details as possible.

## Demo
![Tour Preview](images/preview.gif)

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
