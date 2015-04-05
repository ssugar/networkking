# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

#script to set everything up. chef is slow to download now while the AAG line is cut so only using vagrant provisioners to speed development up
$script = <<SCRIPT
sudo su
echo "deb http://mirror-fpt-telecom.fpt.net/ubuntu/ precise main restricted universe" > /etc/apt/sources.list
echo "deb http://mirror-fpt-telecom.fpt.net/ubuntu/ precise-updates main restricted universe" >> /etc/apt/sources.list
echo "deb http://mirror-fpt-telecom.fpt.net/ubuntu/ precise-security main restricted universe" >> /etc/apt/sources.list
echo "Asia/Ho_Chi_Minh" > /etc/timezone
dpkg-reconfigure --frontend noninteractive tzdata
apt-get update
apt-get install curl -y
apt-get install nano -y

#set up node js on debian
curl -sL https://deb.nodesource.com/setup | bash -
apt-get install nodejs -y
apt-get install build-essential -y 

#initialize networkKing app
mkdir networkKing
cd networkKing
npm init

#install express, express-generator, and express-session modules
npm install express --save
npm install express-generator -g 
npm install express-session --save
cd ..

#build app structure with express module
express -f networkKing
cd networkKing

#install passport module
npm install passport --save
npm install passport-local --save
npm install connect-flash --save
npm install bcrypt-nodejs --save

#install mongodb
apt-get install mongodb -y 

#install mongoose - requires libkrb5-dev or errors will occur with the kerberos sub-module
apt-get install libkrb5-dev -y
npm install mongoose --save

#put files in place
cp -f /vagrant/app.js /home/vagrant/networkKing/app.js
cp /vagrant/db.js /home/vagrant/networkKing/db.js
mkdir /home/vagrant/networkKing/models
cp /vagrant/models/* /home/vagrant/networkKing/models/
mkdir /home/vagrant/networkKing/passport
cp -f /vagrant/passport/* /home/vagrant/networkKing/passport/
cp -f /vagrant/routes/* /home/vagrant/networkKing/routes/
cp -f /vagrant/views/* /home/vagrant/networkKing/views/
cp -f /vagrant/stylesheets/* /home/vagrant/networkKing/public/stylesheets/
cp -f /vagrant/javascripts/* /home/vagrant/networkKing/public/javascripts/

#prepare the application
npm install

#run the web server on port 3000 uncomment line below
#DEBUG=networkKing ./bin/www
SCRIPT

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
   #Set the virtual machine 'box' to use
   config.vm.box = "hashicorp/precise64"
   #Set the vm name
   config.vm.define :networkKing do |t|
   end

   config.vm.provider :hyperv do |v|
	 v.vmname = "networkKing"
     v.memory = 1024
	 v.cpus = 1
   end
   
   #run the script above
   config.vm.provision "shell", inline: $script

end
