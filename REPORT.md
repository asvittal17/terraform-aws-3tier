# Terraform AWS 3-Tier Architecture Report

## Project Overview

This project deploys a complete **3-tier architecture** on AWS using Terraform. It includes a working **Fitness Tracker Web Application** with frontend, backend API, and database.

---

## 1. Project Structure

### Infrastructure Files (Terraform)

| File | Description |
|------|-------------|
| `provider.tf` | AWS provider configuration |
| `variables.tf` | Reusable variables |
| `vpc.tf` | VPC definition |
| `subnet.tf` | Public and private subnets |
| `internet-gateway.tf` | Internet gateway |
| `nat-gateway.tf` | NAT gateway |
| `route-table.tf` | Route tables |
| `security.tf` | Security groups |
| `ec2.tf` | Web server with Flask API |
| `app.tf` | App server |
| `database.tf` | RDS MySQL database |
| `outputs.tf` | Output values |

### Frontend Files

| File | Description |
|------|-------------|
| `frontend/index.html` | Complete fitness tracker UI |
| `frontend/backend/app.py` | Flask API (local testing) |

---

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AWS Cloud                              │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  VPC (10.0.0.0/16)                      │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                          │   │
│  │  ┌────────────────────┐     ┌─────────────────────┐   │   │
│  │  │  PUBLIC SUBNET    │     │  PRIVATE SUBNETS     │   │   │
│  │  │  10.0.1.0/24       │     │  10.0.2.0/24         │   │   │
│  │  │  ap-south-1a      │     │  10.0.3.0/24         │   │   │
│  │  │                   │     │  ap-south-1a,b       │   │   │
│  │  │  ┌──────────────┐  │     │                      │   │   │
│  │  │  │ EC2 Web Server│  │     │  ┌────────────────┐  │   │   │
│  │  │  │ (Flask API)  │  │     │  │ EC2 App Server │  │   │   │
│  │  │  │ Port 80      │  │     │  │ (Private)      │  │   │   │
│  │  │  └──────────────┘  │     │  └────────────────┘  │   │   │
│  │  └────────────────────┘     └─────────────────────┘   │   │
│  │           │                          │                 │   │
│  │  ┌────────┴────────┐     ┌────────┴────────┐        │   │
│  │  │ Internet Gateway│     │  NAT Gateway   │        │   │
│  │  │ (IGW)            │     │                │        │   │
│  │  └─────────────────┘     └─────────────────┘        │   │
│  │                                                      │   │
│  │  ┌────��─────────────────────────────────────────┐   │   │
│  │  │         RDS MySQL Database                   │   │   │
│  │  │    (Multi-AZ in private subnets)            │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Resource Details

### 3.1 Networking Layer

| Resource | CIDR/Config | Description |
|----------|-------------|-------------|
| VPC | 10.0.0.0/16 | Main virtual network |
| Public Subnet | 10.0.1.0/24 | Web server subnet |
| Private Subnet | 10.0.2.0/24 | App server subnet |
| Private Subnet-2 | 10.0.3.0/24 | Database subnet |
| Internet Gateway | IGW | Outbound internet |
| NAT Gateway | NAT | Private subnet outbound |

### 3.2 Compute Layer

| Instance | Subnet | Type | Purpose |
|----------|--------|------|---------|
| Web Server | Public | t2.micro | Flask API + Apache |
| App Server | Private | t2.micro | Backend app |

### 3.3 Database Layer

| Resource | Engine | Class | Storage |
|----------|--------|-------|---------|
| RDS MySQL | mysql | db.t3.micro | 20GB |

### 3.4 Security

- Security Group: Allows SSH (22), HTTP (80)
- All outbound traffic allowed

---

## 4. Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `aws_region` | ap-south-1 | AWS region |
| `db_username` | admin | Database username |
| `db_password` | Admin1234 | Database password |
| `key_name` | mykey | SSH key pair |

---

## 5. Outputs

| Output | Description |
|--------|-------------|
| `vpc_id` | VPC ID |
| `web_server_public_ip` | EC2 Public IP |
| `app_server_private_ip` | App server private IP |
| `database_endpoint` | RDS endpoint |
| `nat_gateway_ip` | NAT EIP |

---

## 6. How to Run

### Prerequisites
- AWS Account
- AWS CLI configured
- Terraform installed
- SSH key pair named "mykey" in AWS

### Commands

#### Step 1: Initialize
```bash
terraform init
```

#### Step 2: Plan
```bash
terraform plan
```

#### Step 3: Apply
```bash
terraform apply
```
Type `yes` when prompted.

#### Step 4: Note Outputs
Copy the `web_server_public_ip` from output.

#### Step 5: Test API
```bash
curl http://<EC2_PUBLIC_IP>/api/workouts
```
Should return: `[]`

#### Step 6: Use Frontend
1. Open `frontend/index.html` in browser
2. Enter EC2 IP in the input field
3. Add and view workouts

#### Step 7: Destroy
```bash
terraform destroy
```

---

## 7. API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/workouts` | GET | Get all workouts |
| `/api/workouts` | POST | Add new workout |
| `/health` | GET | Health check |

### Sample API Calls

**GET Request:**
```bash
curl http://13.232.45.67/api/workouts
```

**POST Request:**
```bash
curl -X POST http://13.232.45.67/api/workouts \
  -H "Content-Type: application/json" \
  -d '{"type":"Running","duration":30,"calories":300}'
```

---

## 8. Database Schema

**Table: workouts**

| Column | Type |
|--------|------|
| id | INTEGER PRIMARY KEY |
| workout_type | TEXT |
| duration | INTEGER |
| calories | INTEGER |
| created_at | TIMESTAMP |

---

## 9. Cost Estimation

| Resource | Monthly Cost (USD) |
|----------|-------------------|
| EC2 Web (t2.micro) | ~$8 |
| EC2 App (t2.micro) | ~$8 |
| RDS MySQL (db.t3.micro) | ~$12 |
| NAT Gateway | ~$30 |
| Data Transfer | ~$5 |
| **Total** | **~$63/month** |

---

## 10. Files Modified in This Session

| File | Changes |
|------|---------|
| `database.tf` | Using variables for credentials |
| `ec2.tf` | Added Flask API with user_data |
| `outputs.tf` | Added useful outputs |
| `provider.tf` | Using region variable |
| `route-table.tf` | Fixed private subnet association |
| `variables.tf` | Added configuration variables |

---

## 11. Security Best Practices

- Private subnets for app server and database
- Security groups restrict inbound traffic
- Database password marked as sensitive
- NAT allows outbound only from private subnets

---

## 12. Future Enhancements

1. Load Balancer (ALB)
2. Auto Scaling Groups
3. Connect Flask to RDS MySQL
4. CloudWatch monitoring
5. CI/CD pipeline

---

**Report Generated:** April 2026  
**Author:** A S Vittal