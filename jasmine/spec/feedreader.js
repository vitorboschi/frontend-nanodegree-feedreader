/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is
         * not empty.
         */
        it('have a url', function() {
            for (let entry of allFeeds) {
                expect(entry.url).toBeDefined();
                expect(entry.url.length).not.toBe(0);
            }
        });


        /* Loop through all entries in the allFeeds object and
         * ensures it has a name defined and that the name is
         * not empty.
         */
        it('have a name', function() {
            for (let entry of allFeeds) {
                expect(entry.name).toBeDefined();
                expect(entry.name.length).not.toBe(0);
            }
        });
    });


    /* Test suite for the slide menu*/
    describe('The menu', function() {

        /* Ensures the menu element is hidden by default.*/
        it('starts hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });


        /* ensures the menu changes visibility when the menu icon
         * is clicked
         */
        it('toggles visibility', function() {
            const menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });


    /* Test suite for the feed loader function */
    describe('Initial Entries', function() {

        /* needs to use beforeEach because loadFeed is async */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* ensures that when the loadFeed function is called and completes
         * its work, there is at least a single .entry element within the
         * .feed container
         */
        it('actually loads a feed', function(done) {
            const entries = $('.feed').find('.entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        let headerBefore = "";
        let feedBefore = "";

        beforeEach(function(done) {
            loadFeed(0, function() {
                //after loading feed 0, store the values and start loading of feed 1
                this.headerBefore = $('.header-title')[0].innerHTML;
                this.feedBefore = $('.feed')[0].innerHTML;
                loadFeed(1, done);
            });
        });


        /* Ensures when a new feed is loaded by the loadFeed function that the
         * content actually changes.
         */
        it('changes the page contents', function(done) {
            expect(this.headerBefore).not.toBe($('.header-title')[0].innerHTML);
            expect(this.feedBefore).not.toBe($('.feed')[0].innerHTML);
            done();
        });
    });
}());
