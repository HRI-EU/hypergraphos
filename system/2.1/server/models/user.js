/*
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
*/

 class User {
  constructor( name, email, password ) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

module.exports = User;