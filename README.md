# Gist Block by Pantheon #
**Contributors:** getpantheon, danielbachhuber  
**Tags:** github gist, gutenberg  
**Requires at least:** 4.4  
**Tested up to:** 4.9.2  
**Stable tag:** 0.1.0  
**License:** GPLv2 or later  
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html  

Include GitHub Gists in your Gutenberg posts without the hassle.

## Description ##

The Gist Block by Pantheon makes it possible to embed GitHub Gists in your Gutenberg posts. Simply add the "GitHub Gist" block, paste the URL to your Gist, and see it transform to a wonderful preview.

Curious as to how blocks work? This is a great one to explore. Specifically, check out these implementation details:

1. Block UI is registered in `blocks/github-gist/index.js`. When the block is previewed in Gutenberg, custom code is used to generate the embed.
2. Fallback HTML content is what's actually stored in the post content.
3. A dynamic render callback is used to transform the block to GitHub's standard Gist embed code.

Read "[How to Convert a Shortcode to a Gutenberg Block](https://pantheon.io/blog/how-convert-shortcode-gutenberg-block)" for a more detailed explanation of the plugin.

Something we can clarify? [Check out the project on GitHub](https://github.com/pantheon-systems/github-gist-gutenberg-block/) for any questions, feedback, suggestions, or pull requests.

## Installation ##

The Gist Block can be installed just like any other WordPress plugin!

## Changelog ##

### 0.1.0 (Feb. 5th, 2018) ###
* Initial release.
