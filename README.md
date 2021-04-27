
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Klowar/cdb">
    <img src="images/logo.png" alt="Logo" width="256" height="256">
  </a>

  <h3 align="center">CBD</h3>

  <p align="center">
    Column Based DB
    <br />
    <a href="https://github.com/Klowar/cdb"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Klowar/cdb">View Demo</a>
    ·
    <a href="https://github.com/Klowar/cdb/issues">cdbrt Bug</a>
    ·
    <a href="https://github.com/Klowar/cdb/issues">Request Feature</a>
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

Column Based Database written on NodeJS (14+), this is school project so almost 90% chance will not catch 1.0.0 version


### Built With

* [NodeJS](https://nodejs.org/)
* [Jison](https://github.com/zaach/jison)
* [Lex & Yacc](http://mech.math.msu.su/~vvb/FormLang/LexYacc/lexyacc.htm)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install yarn -g
  ```

### Installation

1. Clone the cdb
   ```sh
   git clone https://github.com/Klowar/cdb.git
   ```
2. Install node packages
   ```sh
   yarn install
   ```
3. Build
    ```sh
    yarn build
    ```
4. Start
   ```sh
   yarn start
   ```


<!-- USAGE EXAMPLES -->
## Usage

Now we support 3 kind of queries.
Honestly parser support alter, update, delete and other statements, but for now we do not realize their logic
Also no client as psql, so just use netcat
1.  Connect
    ```sh
    sh src/client/client.sh
    ```
2. CREATE
    ```sh
    CREATE TABLE users(...);
    ```
3. INSERT
    ```sh
    INSERT INTO users(...) VALUES (...); 
    ```
    OR
    ```sh
    INSERT INTO users VALUES (...); 
    ```
4. DROP
    ```sh
    DROP TABLE users;
    ```


_For more examples, please refer to the [Documentation](https://github.com/Klowar/cdb/wiki)_



<!-- ROADMAP -->
## Roadmap

1. SELECTION support
2. CHARACTER size support

See the [open issues](https://github.com/Klowar/cdb/issues) for a list of proposed features (and known issues).



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

Your Name - [@aid_meme](https://twitter.com/aid_meme) - ideeer4@gmail.com

Project Link: [https://github.com/Klowar/cdb](https://github.com/Klowar/cdb)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Klowar/cdb.svg?style=for-the-badge
[contributors-url]: https://github.com/Klowar/cdb/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Klowar/cdb.svg?style=for-the-badge
[forks-url]: https://github.com/Klowar/cdb/network/members
[stars-shield]: https://img.shields.io/github/stars/Klowar/cdb.svg?style=for-the-badge
[stars-url]: https://github.com/Klowar/cdb/stargazers
[issues-shield]: https://img.shields.io/github/issues/Klowar/cdb.svg?style=for-the-badge
[issues-url]: https://github.com/Klowar/cdb/issues
[license-shield]: https://img.shields.io/github/license/Klowar/cdb.svg?style=for-the-badge
[license-url]: https://github.com/Klowar/cdb/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/Klowar