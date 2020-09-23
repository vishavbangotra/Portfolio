import React, {Component} from 'react';
import './css/Navbar.css';
class Navbar extends Component{
  render(){
    return(
      <div>
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="#">Brand</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#">ABOUT</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">PROJECTS</a>
                </li>
                <li class="nav-item edu-nav-item">
                  <a class="nav-link" href="#">EDUCATION</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">EXPERIENCE</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
    )
  }
}

export default Navbar
