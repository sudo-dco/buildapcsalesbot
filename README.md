<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">BuildAPCSalesBot</h3>

  <p align="center">
    Hi, this was a personal project came about during my time struggling to beat the bots on buying a 5600x. After days of missing in stock notifications,
    I decided I had to do something about it. I wanted to make a Discord bot that would alert me anytime a post was made on /r/buildapcsales regarding any CPU.
    It was a great excuse to learn about using the Reddit API and how Discord bots worked and I had a lot of fun with it.
    I've recently expanded to include other PC parts and looking for posts in the hardwareswap subreddit.
    <br />
    <a href="https://github.com/sudo-dco/buildapcsalesbot"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/sudo-dco/buildapcsalesbot">View Demo</a>
    ·
    <a href="https://github.com/sudo-dco/buildapcsalesbot/issues">Report Bug</a>
    ·
    <a href="https://github.com/sudo-dco/buildapcsalesbot/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


### Built With

* []() Node.js
* []() Snoowrap
* []() Discord.js



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sudo-dco/buildapcsalesbot.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```



<!-- USAGE EXAMPLES -->
## Usage

1. Edit the env file with your reddit bot credentials and your Discord bot token.
2. Change the timer variable to set how often you want the bot to check. Default is 5 minutes.
3. Edit the channel IDs in the sendMessage function depending on what channel you want the message sent to in Discord.
4. Run the script with 'node index.js' to run locally, I currently have it running on Heroku.

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/sudo-dco/buildapcsalesbot/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - thisisdco@gmail.com

Project Link: [https://github.com/sudo-dco/buildapcsalesbot](https://github.com/sudo-dco/buildapcsalesbot)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/sudo-dco/buildapcsalesbot.svg?style=for-the-badge
[contributors-url]: https://github.com/sudo-dco/buildapcsalesbot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/sudo-dco/buildapcsalesbot.svg?style=for-the-badge
[forks-url]: https://github.com/sudo-dco/buildapcsalesbot/network/members
[stars-shield]: https://img.shields.io/github/stars/sudo-dco/buildapcsalesbot.svg?style=for-the-badge
[stars-url]: https://github.com/sudo-dco/buildapcsalesbot/stargazers
[issues-shield]: https://img.shields.io/github/issues/sudo-dco/buildapcsalesbot.svg?style=for-the-badge
[issues-url]: https://github.com/sudo-dco/buildapcsalesbot/issues
[license-shield]: https://img.shields.io/github/license/sudo-dco/buildapcsalesbot.svg?style=for-the-badge
[license-url]: https://github.com/sudo-dco/buildapcsalesbot/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/dcowa
