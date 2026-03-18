# terraform-aws-3tier
# 🚀 Terraform AWS 3-Tier Architecture (FitTrack Ready)

## 📌 Project Overview

This project demonstrates **Infrastructure as Code (IaC)** using Terraform to deploy a **3-tier architecture (Web, App, Database)** on AWS.

The infrastructure is fully automated and can be created or destroyed using simple Terraform commands.

---

## 🏗️ Architecture

The system follows a **3-tier architecture**:

* 🌐 **Web Tier (Public Subnet)**

  * EC2 instance running Apache/Nginx
  * Serves frontend (React / static site)

* ⚙️ **Application Tier (Private Subnet)**

  * EC2 instance running backend (Flask API)

* 🗄️ **Database Tier (Private Subnet)**

  * MySQL / RDS database
  * Securely accessed from App tier

---

## ☁️ AWS Resources Used

* VPC
* Public & Private Subnets
* Internet Gateway
* NAT Gateway
* Route Tables
* Security Groups
* EC2 Instances
* (Optional) RDS Database

---

## ⚙️ Tools & Technologies

* Terraform (IaC)
* AWS (EC2, VPC, Networking)
* Linux (Amazon Linux)
* Git & GitHub

---

## 🔁 Terraform Commands

### Initialize project

```bash
terraform init
```

### Create infrastructure

```bash
terraform apply
```

### Destroy infrastructure

```bash
terraform destroy
```

---

## Features

* Fully automated infrastructure deployment
* 3-tier architecture implementation
* Secure networking (public/private subnets)
* Easy creation and teardown (cost optimization)
* Ready for full-stack app deployment (FitTrack)

---

##  Future Enhancement

* Add Load Balancer (ALB)
* Auto Scaling Groups
* Multi-AZ High Availability
* CI/CD pipeline integration
* Deploy FitTrack application fully

---

## 🧠 Learning Outcome

* Hands-on experience with AWS cloud
* Understanding of VPC and networking
* Infrastructure automation using Terraform
* Real-world DevOps workflow

---

## 👨‍💻 Author

**A S Vittal**
GitHub: https://github.com/asvittal17

---

## 📢 Note

This project can be extended to deploy real-world applications like **FitTrack** using a scalable cloud architecture.
