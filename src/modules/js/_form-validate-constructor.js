  /**
   * @param {'#email'} selectorEmail 
   * @param {'#password'} selectorPassword 
   * @param {'#confirmPassword'} selectorConfirmPassword 
   * @param {'correct'} classCorrect 
   * @param {'error'} classError 
   */
  function ValidateForm( selectorEmail, selectorPassword, selectorConfirmPassword, passwordNotice, classCorrect, classError ) {

    this.email = null;
    this.$email = $(selectorEmail);
    this.setEmail = function(newValue) {
      this.email = newValue;
    };
    this.emailIsCorrect = function(email = this.email) {
      if (email === null || email === '') {
        this.$email.removeClass(classError);
      } else {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( regex.test(email) ) {
          this.$email.removeClass(classError);
          this.$email.addClass(classCorrect);
          return true;
        } else {
          this.$email.removeClass(classCorrect);
          this.$email.addClass(classError);
          return false;
        }     
      }
    };
    this.password = null;
    // this.password = {
    //   first: null,
    //   second: null
    // };
    this.$password = $(selectorPassword);
    this.confirmPassword = null;
    this.$confirmPassword = $(selectorConfirmPassword);
    this.$passwordNotice = $(passwordNotice);
    this.setPassword = function(number, newValue) {
      if (number === 1) {
        this.password = newValue;
        if ( this.passwordIsValid(this.password, 1) ) {
          this.addClassCorrect( this.$password );
          this.addClassCorrect( this.$passwordNotice );
          if ( this.passwordsIsEqual() ) {
            this.addClassCorrect( this.$confirmPassword );
          }
        } else {
          this.addClassError( this.$passwordNotice );
          this.addClassError( this.$password );
          this.addClassError( this.$confirmPassword );//auto set not valid for second password
        }
      } else if (number === 2) {
        // console.log('setPassword 2');
        this.confirmPassword = newValue;
        if ( this.passwordIsValid(this.confirmPassword, 2) ) {
          // console.log('passwordIsValid 2');
          this.addClassCorrect( this.$confirmPassword );
        } else {
          // console.log('passwordIs NOT Valid 2');
          // console.log( this.$confirmPassword );
          this.addClassError( this.$confirmPassword );
        }
      }
    };
    this.passwordIsValid = function( pass, number = 1 ) {
      if (pass===null) {
        console.log('Password is empty...');
        return false;
      }
      //TODO: empty string should be with no error marker
      // console.log(pass);
      // console.log(number);
      // if ( pass === null || pass === '' ) {
      //   if ( number === 1 ) {
      //     this.removeClassError(this.$password);
      //   } else if ( number === 2 ) {
      //     this.removeClassError(this.$confirmPassword);
      //   }
      // }
      if (pass.length >= 8) {//validate length        
        if ( pass.match(/[a-zа-яё]/) ) {//validate letter          
          if ( pass.match(/[A-ZА-ЯЁ]/) ) {//validate capital letter            
            if ( pass.match(/\d/) ) {//validate number
              //console.log('Password is valid...');
              if (number === 1) {//for first password checking only valid
                console.log('Password is valid...');
                return true;
              } else if (number === 2) {
                if (this.passwordsIsEqual()) {
                  console.log('Passwords is valid and identical...');
                  return true;
                } else {
                  console.log('Passwords is not identical...');
                  return false;
                }
              }              
            } else {
              console.log('Please write one or more digitals...');
              return false;
            }
          } else {
            console.log('Please write one or more uppercase letter...');
            return false;
          }
        } else {
          console.log('Please write one or more letter...');
          return false;
        }
      } else {
        console.log('Please write more then 8 simbols...');
        return false;
      }
    };
    this.passwordsIsEqual = function() {
      if ( this.confirmPassword === this.password ) {
          console.log('Confirms password is equal...');
          return true;        
      } else {
        return false;
      }      
    };
    this.addClassCorrect = function(target) {
      target.removeClass(classError);
      target.addClass(classCorrect);
    };    
    this.addClassError = function(target) {
      target.removeClass(classCorrect);
      target.addClass(classError);
    };
    this.removeClassError = function(target) {
      target.removeClass(classError);
    };

  }
