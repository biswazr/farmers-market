# farmers-market
farmers-market

# command to build container  (Assuming docker already installed on Hostmachine and configured )
 
 sudo docker build -t biswa/farmer-app .

# Running Container
 
 sudo docker run -p 3000:3000 -d --name farmer-app  biswa/farmer-app


# see container running 

 sudo docker ps -a | grep farmer-app

# Use Application

typer you host ip with 3000 port  you should see the form on a webpage 

