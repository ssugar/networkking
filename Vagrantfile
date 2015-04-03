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
#set up networkKing app
mkdir networkKing
cd networkKing
npm init
#install express
npm install express --save
npm install express-generator -g 
#install node-gyp to the global scope as errors occurred when installing mongoose
#npm install -g node-gyp
#install mongoose
#npm install mongoose --save
cd ..
#build app structure
express -f networkKing
cd networkKing
#install passport
npm install passport --save
npm install passport-local --save
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
