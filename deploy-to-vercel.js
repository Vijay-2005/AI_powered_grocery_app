/**
 * This script demonstrates how to deploy to Vercel with environment variables.
 * You can use it as a reference, but for actual deployment, you should use the Vercel CLI
 * or the Vercel dashboard.
 */

const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to execute shell commands
const execute = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
};

// Function to collect environment variables
const collectEnvVariables = () => {
  return new Promise((resolve) => {
    const envVars = {};
    
    console.log('\n=== Firebase Configuration ===');
    
    askQuestion('Enter your Firebase API Key: ')
      .then(apiKey => {
        envVars.REACT_APP_FIREBASE_API_KEY = apiKey;
        return askQuestion('Enter your Firebase Auth Domain: ');
      })
      .then(authDomain => {
        envVars.REACT_APP_FIREBASE_AUTH_DOMAIN = authDomain;
        return askQuestion('Enter your Firebase Project ID: ');
      })
      .then(projectId => {
        envVars.REACT_APP_FIREBASE_PROJECT_ID = projectId;
        return askQuestion('Enter your Firebase Storage Bucket: ');
      })
      .then(storageBucket => {
        envVars.REACT_APP_FIREBASE_STORAGE_BUCKET = storageBucket;
        return askQuestion('Enter your Firebase Messaging Sender ID: ');
      })
      .then(messagingSenderId => {
        envVars.REACT_APP_FIREBASE_MESSAGING_SENDER_ID = messagingSenderId;
        return askQuestion('Enter your Firebase App ID: ');
      })
      .then(appId => {
        envVars.REACT_APP_FIREBASE_APP_ID = appId;
        
        console.log('\n=== API Configuration ===');
        return askQuestion('Enter your API Base URL (or press Enter to skip): ');
      })
      .then(apiBaseUrl => {
        if (apiBaseUrl) {
          envVars.REACT_APP_API_BASE_URL = apiBaseUrl;
        }
        
        resolve(envVars);
      });
  });
};

// Function to ask a question and return a promise with the answer
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Main function
async function main() {
  console.log('=== Vercel Deployment Helper ===');
  console.log('This script will help you deploy your Fresh Cart app to Vercel');
  
  // Check if Vercel CLI is installed
  try {
    await execute('vercel --version');
  } catch (error) {
    console.log('Vercel CLI is not installed. Installing...');
    try {
      await execute('npm install -g vercel');
    } catch (installError) {
      console.error('Failed to install Vercel CLI. Please install it manually with: npm install -g vercel');
      rl.close();
      return;
    }
  }
  
  // Check if user is logged in to Vercel
  console.log('\nChecking Vercel login status...');
  try {
    await execute('vercel whoami');
    console.log('You are logged in to Vercel.');
  } catch (error) {
    console.log('You are not logged in to Vercel. Please log in:');
    try {
      await execute('vercel login');
    } catch (loginError) {
      console.error('Failed to log in to Vercel. Please try again later.');
      rl.close();
      return;
    }
  }
  
  // Collect environment variables
  console.log('\nPlease provide your environment variables:');
  const envVars = await collectEnvVariables();
  
  // Create temporary .env file
  console.log('\nCreating temporary .env file...');
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  fs.writeFileSync('.env.vercel', envContent);
  
  // Deploy to Vercel
  console.log('\nDeploying to Vercel...');
  
  const deployProd = await askQuestion('Deploy to production? (y/n): ');
  const prodFlag = deployProd.toLowerCase() === 'y' ? '--prod' : '';
  
  try {
    // Create command to include all env variables
    let vercelCommand = 'vercel';
    
    // Add environment variables
    Object.entries(envVars).forEach(([key, value]) => {
      vercelCommand += ` -e ${key}="${value}"`;
    });
    
    // Add production flag if needed
    if (prodFlag) {
      vercelCommand += ` ${prodFlag}`;
    }
    
    console.log('\nExecuting deployment...');
    const deploymentOutput = await execute(vercelCommand);
    console.log(deploymentOutput);
    
    console.log('\nDeployment initiated successfully!');
  } catch (error) {
    console.error('Deployment failed. Please try again or deploy manually using the Vercel dashboard.');
  }
  
  // Clean up
  console.log('\nCleaning up...');
  try {
    fs.unlinkSync('.env.vercel');
  } catch (error) {
    console.log('Note: Could not remove temporary .env file. You may want to delete it manually.');
  }
  
  console.log('\nDone! Your app should now be deployed to Vercel.');
  console.log('Visit your Vercel dashboard to check the deployment status and configure additional settings.');
  
  rl.close();
}

// Run the main function
main().catch(error => {
  console.error('An error occurred:', error);
  rl.close();
}); 