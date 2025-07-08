# Git Instructions

## Initializing a new repository

```bash
git init
git add .
git commit -m "Initial commit"
```

## Connecting to a remote repository

```bash
git remote add origin <your-repository-url>
git push -u origin master
```

## Common commands

-   `git status`: Check the status of your repository
-   `git add <file>`: Add a file to the staging area
-   `git commit -m "<message>"`: Commit your changes
-   `git push`: Push your changes to the remote repository
-   `git pull`: Pull the latest changes from the remote repository


This is typically done in one of two ways:                                                         
                                                                                                     
                                                                                                     
   1. HTTPS with a Personal Access Token (PAT): You would configure Git to use a PAT, which
      acts like a password. You need to generate this token in your GitHub developer settings        
      with the repo scope.
   2. SSH: You would add your SSH public key to your GitHub account and configure your local
      repository to use the SSH remote URL.


  When I run git push on your behalf, it will succeed only if your system is already set
  up with one of these methods.

> can you tell me the steps to be done via SSH way

✦ Of course. Here are the steps to connect your local repository to GitHub using SSH:

  Step 1: Check for Existing SSH Keys

  First, check if you already have an SSH key. Open your terminal and run:


   1 ls -al ~/.ssh



  Look for files named id_rsa.pub, id_ecdsa.pub, or id_ed25519.pub. If you see one, you
  have an existing key and can skip to Step 3.

  Step 2: Generate a New SSH Key


  If you don't have a key, generate a new one. The recommended method is Ed25519. Replace
  the email with the one you use for your GitHub account.


   1 ssh-keygen -t ed25519 -C "your_email@example.com"



  When prompted to "Enter a file in which to save the key," you can press Enter to accept
  the default location. You'll also be asked to enter a secure passphrase, which is highly
  recommended.

  Step 3: Add Your SSH Key to the ssh-agent

  Ensure the ssh-agent is running and add your new key to it.


   1 # Start the ssh-agent in the background
   2 eval "$(ssh-agent -s)"
   3
   4 # Add your SSH private key to the ssh-agent
   5 ssh-add ~/.ssh/id_ed25519


  Step 4: Add the SSH Key to Your GitHub Account


   1. Copy your public SSH key to your clipboard. You can display it in the terminal using
      cat:


   1     cat ~/.ssh/id_ed25519.pub



   2. Go to your GitHub account settings:
       * Click your profile picture in the top-right corner, then click Settings.
       * In the "Access" section of the sidebar, click SSH and GPG keys.
       * Click New SSH key or Add SSH key.
       * Give it a descriptive title (e.g., "My Work Laptop").
       * Paste the key you copied into the "Key" field.
       * Click Add SSH key.

  Step 5: Connect Your Local Repository to GitHub

  Finally, update your local repository to use the SSH remote URL.


   1. Go to your repository on GitHub and click the green <> Code button.
   2. Make sure SSH is selected and copy the URL (it should look like
      git@github.com:USERNAME/REPOSITORY.git).
   3. In your local terminal, navigate to your project directory and run one of the following        
      commands.


       * If you haven't added a remote yet:

   1         git remote add origin git@github.com:USERNAME/REPOSITORY.git

       * If you already have a remote named origin that uses HTTPS, change it:


   1         git remote set-url origin git@github.com:USERNAME/REPOSITORY.git


  Step 6: Test Your Connection

  You can verify that everything is set up correctly by running:


   1 ssh -T git@github.com



  You should see a message like: Hi USERNAME! You've successfully authenticated, but
  GitHub does not provide shell access. This confirms your connection is working. You can
  now use git push and git pull without needing to enter a password.
