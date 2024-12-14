import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../landing.css";
import logo from "../../images/logo-full.png";
import about from "../../images/landing/Job-recruitment.jpg";
import job1 from "../../images/landing/job-1.jpg";
import job2 from "../../images/landing/job-2.jpg";
import job3 from "../../images/landing/job-3.jpg";
import facebook from "../../images/landing/facebook.png";
import instagram from "../../images/landing/instagram.png";
import youtube from "../../images/landing/youtube.png";
import twitter from "../../images/landing/twitter.png";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const menuBtn = $("#menu-btn");
    const navLinks = $("#nav-links");
    const menuBtnIcon = menuBtn.find("i");

    menuBtn.on("click", () => {
      navLinks.toggleClass("open");

      const isOpen = navLinks.hasClass("open");
      menuBtnIcon.attr("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    navLinks.on("click", () => {
      navLinks.removeClass("open");
      menuBtnIcon.attr("class", "ri-menu-line");
    });

    // Cleanup event listeners on component unmount
    return () => {
      menuBtn.off("click");
      navLinks.off("click");
    };
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <header className="blogheader">
        <nav className="blognav">
          <div className="blognav__bar">
            <div className="logo">
              <a className="anchortags" href="/">
                <img className="blogimage" src={logo} alt="logo" />
              </a>
            </div>
            <div className="blognav__menu__btn" id="menu-btn">
              <i className="ri-menu-line"></i>
            </div>
          </div>
          <ul className="blognav__links" id="nav-links">
            <li>
              <a className="anchortags" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="anchortags" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="anchortags" href="#service">
                Services
              </a>
            </li>
            <li>
              <a className="anchortags" href="#explore">
                Explore
              </a>
            </li>
            <li>
              <a className="anchortags" href="#contact">
                Contact
              </a>
            </li>
          </ul>
          <button onClick={handleLoginClick} className="blogbtn nav__btn">
            Login
          </button>
        </nav>
        <div className="blogsection__container blogheader__container" id="home">
          <p>Empowering Careers - Connecting Futures</p>
          <h1>
            <span className="buildfeacture">Build Your Future</span>
            <br />
            With Our <span>Placement Services</span>.
          </h1>
        </div>
      </header>
      <section className="blogsection__container blogbooking__container">
        <form action="/" className="blogbooking__form">
          <div className="bloginput__group">
            <span>
              <i className="ri-map-pin-fill"></i>
            </span>
            <div>
              <label for="location">LOCATION</label>
              <input type="text" placeholder="Location" />
            </div>
          </div>
          <div className="bloginput__group">
            <span>
              <i className="ri-book-fill"></i>
            </span>
            <div>
              <label for="subject">SUBJECT</label>
              <input type="text" placeholder="Subject" />
            </div>
          </div>
          <div className="bloginput__group">
            <span>
              <i className="ri-graduation-cap-fill"></i>
            </span>
            <div>
              <label for="teaching-level">TEACHING-LEVEL</label>
              <input type="text" placeholder="Teaching-level" />
            </div>
          </div>
          <div className="input__group input__btn">
            <button className="blogbtn">SEARCH</button>
          </div>
        </form>
      </section>
      <section className="blogsection__container about__container" id="about">
        <div className="about__image">
          <img className="blogimage" src={about} alt="about" />
        </div>
        <div className="about__content">
          <p className="section__subheader">ABOUT US</p>
          <h2 className="section__header">Your Career Journey Starts Here!</h2>
          <p className="section__description">
            Our platform is dedicated to providing exceptional job placement
            services for college students and recent graduates.Whether you're a
            student looking for internships or a graduate seeking your first
            job, we offer personalized support to help you take the next step in
            your professional journey.
          </p>
          <div className="about__btn">
            <button className="blogbtn">Read More</button>
          </div>
        </div>
      </section>

      <section className="blogsection__container room__container">
        <p className="section__subheader">OUR PLACEMENT CELL</p>
        <h2 className="section__header">
          Bridging Education and Employment...
        </h2>
        <div className="room__grid">
          <div className="room__card">
            <div className="room__card__image">
              <img className="blogimage" src={job1} alt="room" />
              <div className="room__card__icons">
                <span>
                  <i className="ri-shield-star-line"></i>
                </span>
              </div>
            </div>
            <div className="room__card__details">
              <h4>On-Campus Recruitment</h4>
              <p>
                Regularly organized campus recruitment drives where top
                companies visit to hire our students.
              </p>
            </div>
          </div>
          <div className="room__card">
            <div className="room__card__image">
              <img className="blogimage" src={job2} alt="room" />
              <div className="room__card__icons">
                <span>
                  <i className="ri-shield-star-line"></i>
                </span>
              </div>
            </div>
            <div className="room__card__details">
              <h4>Extensive Network</h4>
              <p>
                We have strong ties with numerous companies, ensuring a wide
                range of job opportunities for our students.
              </p>
            </div>
          </div>
          <div className="room__card">
            <div className="room__card__image">
              <img className="blogimage" src={job3} alt="room" />
              <div className="room__card__icons">
                <span>
                  <i className="ri-shield-star-line"></i>
                </span>
              </div>
            </div>
            <div className="room__card__details">
              <h4>Internship Opportunities</h4>
              <p>
                Facilitation of internships that provide hands-on experience and
                practical knowledge in students' fields of interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="service" id="service">
        <div className="blogsection__container service__container">
          <div className="service__content">
            <p className="section__subheader">SERVICES</p>
            <h2 className="section__header">Strive Only For The Best.</h2>
            <ul className="service__list">
              <li>
                <span>
                  <i className="ri-shield-star-line"></i>
                </span>
                High class Security
              </li>
              <li>
                <span>
                  <i className="ri-24-hours-line"></i>
                </span>
                24 Hours Room Service
              </li>
              <li>
                <span>
                  <i className="ri-headphone-line"></i>
                </span>
                Conference Room
              </li>
              <li>
                <span>
                  <i className="ri-map-2-line"></i>
                </span>
                Customer Support
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="blogsection__container banner__container">
        <div className="banner__content">
          <div className="banner__card">
            <h4>125+</h4>
            <p>Organization Enrolled</p>
          </div>
          <div className="banner__card">
            <h4>350+</h4>
            <p>Seekers Placed</p>
          </div>
          <div className="banner__card">
            <h4>600+</h4>
            <p>Job Requirement</p>
          </div>
        </div>
      </section>

      <section className="explore" id="explore">
        <p className="section__subheader">EXPLORE</p>
        <h2 className="section__header">What's New Today.</h2>
        <div className="explore__bg">
          <div className="explore__content">
            <p className="section__description">10th MAR 2023</p>
            <h4>A New Jobs Are Available.</h4>
            <button className="blogbtn">Continue</button>
          </div>
        </div>
      </section>

      <footer className="blogfooter" id="contact">
        <div className="blogsection__container blogfooter__container">
          <div className="footer__col">
            <div className="logo">
              <a href="#home">
                <img className="blogimage" src={logo} alt="logo" />
              </a>
            </div>
            <p className="section__description">
              We partner with a diverse range of Organizations across various
              cities to offer a wide array of job opportunities..
            </p>
            <button className="blogbtn">Book Now</button>
          </div>
          <div className="footer__col">
            <h4>QUICK LINKS</h4>
            <ul className="footer__links">
              <li>
                <a className="anchortags" href="#">
                  Browse Destinations
                </a>
              </li>
              <li>
                <a className="anchortags" href="#">
                  Special Offers & Packages
                </a>
              </li>
              <li>
                <a className="anchortags" href="#">
                  Room Types & Amenities
                </a>
              </li>
              <li>
                <a className="anchortags" href="#">
                  Customer Reviews & Ratings
                </a>
              </li>
              <li>
                <a className="anchortags" href="#">
                  Travel Tips & Guides
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>OUR SERVICES</h4>
            <ul className="footer__links">
              <li>
                <a className="anchortags" href="#">
                  Concierge Assistance
                </a>
              </li>
              <li>
                <a className="anchortags" href="#">
                  Flexible Booking Options
                </a>
              </li>
              <li>
                <a className="anchortags" href="#">
                  Airport Transfers
                </a>
              </li>
              <li>
                <a className="anchortags" href="#">
                  Wellness & Recreation
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>CONTACT US</h4>
            <ul className="footer__links">
              <li>
                <a className="anchortags" href="#">
                  rayalpark@info.com
                </a>
              </li>
            </ul>
            <div className="footer__socials">
              <a className="anchortags" href="#">
                <img className="blogimage" src={facebook} alt="facebook" />
              </a>
              <a className="anchortags" href="#">
                <img className="blogimage" src={instagram} alt="instagram" />
              </a>
              <a className="anchortags" href="#">
                <img className="blogimage" src={youtube} alt="youtube" />
              </a>
              <a className="anchortags" href="#">
                <img className="blogimage" src={twitter} alt="twitter" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer__bar">
          Copyright © 2023 Web Design Mastery. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Landing;
