# install gulp guide

### work.artem.kuznecov.samara@yandex.ru

### https://github.com/nodesource/distributions/blob/master/README.md

### (unix): 
  `sudo apt install curl`  
  `curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -`  
  `sudo apt install -y nodejs`  
  `sudo apt install -y npm`  
  `node --version`
  `npm --version`
  `sudo apt autoremove`  
  `npm i`  
  `sudo npm i gulp -g`  
  `gulp`

  ## Если `npm i` не устанавливается, то:
    ```
    # Update nodejs to latest version:
    sudo npm install -g n
    sudo n latest
    # Update npm to latest version:
    sudo npm install -g npm
    # Try npm install
    npm i
    ```
  
  ## Если `gulp` не запускается, то:
    ***Удалить `node_modules` и переустановить `npm i`***



### (windows):  
  ***install nodejs with npm:***   
    [https://nodejs.org/en/download/](https://nodejs.org/en/download/)  
  ***PowerShell command:***  
    `npm i`  