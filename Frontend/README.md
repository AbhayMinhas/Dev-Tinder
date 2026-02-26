# DevTinder

- Created a Vite+react project
- Remove unacessary code and create a app

- Install tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Crete a NavBar.jsx seperate Component file
- Install react router dom
  //routing can be created on the root level of your application
  //done on app.jsx

Body
NavBar
Route =/ =>Feed
Route =/login =>login
Route =/connections =>Connections
Route =/profile => Profile
-- >inside

- Create Browser Router > Routes > Route=/Body > RouteChildren
- Create an Outlet in your Body Component
  -Create a footer
  -Create a login page
- Install axios
- CORS - install cors in backend => add middleware to app with configurations: origin,cretdentials:true
- Whenever you're making API call so pass axios => {withCredentials: true}
- Install Redux ToolKit - https://redux-toolkit.js.org/tutorials/quick-start

-Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store

- npm install @reduxjs/toolkit
- npm install react-redux
- In oneline --> npm install @reduxjs/toolkit react-redux
  install multiple libraries whith space seperation in one go

-Add redux devtools in chrome
-Login and see if your data is coming properly in the store
-NavBar should update as soon as user logs in
-Refactor out code to add contants file + create a components folder

- You should not be able to access other routes without login
- if token is not present, redirect user to the login page
- Logout Feature
  -Get the feed and add the feed in the store
  -build the user card on feed
  -Edit Profile Feature
  -Show Toast Message on save of profile

- New Page - see all my connections
- New Page - see all my connection requests
- Feature - Accept/Reject Connection Request
- send/ignore the user card from Feed
- Signup New User
- E2ETesting

Remaining:

- can improve ui
- can add meta descriptor in index.html it will help in seo.

# Deployment

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- .pem is an extension which stores your secret key.
- ssh -i "devTinder-secret.pem" ubuntu@ec2-16-171-234-108.eu-north-1.compute.amazonaws.com
- logged into the machine using this ssh command
- Install Node version 22.18.0
- Git Clone

-Frontend - npm install in the frontend project -> it installed the dependencies
-npm run build
-sudo apt update
-sudo apt install nginx
-sudo systemctl start nginx
-sudo systemctl enable nginx
-Copy code from dist(build files) to /var/www/html/
-in frontend folder
-sudo scp -r dist/\* /var/www/html/
-Enable port :80 of your instance

- Backend
  - updated DB password
    -allowed ec2 instance public IP on mongodb server
  - npm install pm2@latest -g
  - pm2 start npm --name "devTinder-backend" -- start
  - pm2 logs
  -pm2 list, pm2 flush <nameOfProcess>, pm2 delete <name>
  -config nginx - /etc/nginx/sites-available/default
  - restart nginx- sudo systemctl restart nginx
  -Modify the BASEURL in frontend project to "/api"

# Nginx config-

Frontend = http://16.171.193.4/
Backend = http://16.171.193.4:7777/

Domain name= devtinder.com => 16.171.193.4

Frontend = devtinder.com
Backend = devtinder.com:7777

nginx config:

server_name 16.171.166.191;

location /api/ {
proxy_pass http://localhost:7777/;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_set_header Host $host;

    proxy_cache_bypass $http_upgrade;

}

# Adding a custom domain name
  - Purchased domain name from godaddy
  - signup on cloudflare & add a new domian name
  - change the nameservers on godaddy and point it to cloudflare
  - wait for sometime till your nameservers are updated ~ 15 minutes
  - DNS record: A devtinder.in 16.171.166.191
  - Enable SSL for website

# Sending Emails via SES
  - Create a IAM user
  - Give Access to AmazonSESFULLAccess
  - Amazon SES: Create an Identity
  - Verify your domain name
  - Verify an email address identity
  - Install AWS SDK - v3
  - Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
  - writing code...
  - setup SesClient
  - Access Credentials should be created in IAM under security credentials Tab
  - Add the credentials to the .env file
  - write code for SESClient
  - Write code for Sending email address
  - Make the email dynamic by passing more params to the run function.



# Scheduling cron jobs in NodeJS
    - Installing node-cron
    - Learning about cron expressions syntax - crontab.guru
    - Schedule a job
    - date-fns
    - Find all the uniqure email Id who have got connection request in Previous day
    - Send Email
    - Explore queue machenism to send bulk emails.
    - Amazon SES Bulk Email
    - Make sendEmail function dynamic
    - bee-queue & bull npm packages (and BULL MQ with redis).


# Razorpay Payment Gateway Integration
    - Sign up on Razorpay & complete KYC
    - Created a UI for premium page
    - Creating an API for create order in backend
    - add my key and secret in .env file
    - Initialized Razorpay in utils
    - creating order on Razorpay
    - create Schema and model
    - saved the order in payments collection
    -make the api dynamic 
    -https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#1-build-integration
    - Setup Razorpay webhook on your live Api
    - Ref - https://github.com/razorpay/razorpay-node/tree/master/documents
    
    - Ref - https://razorpay.com/docs/webhooks/validate-test/
    - Ref - https://razorpay.com/docs/webhooks/payments/
    