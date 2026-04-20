variable "db_username" {
  description = "Database admin username"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Database admin password (min 8 characters)"
  type        = string
  default     = "Admin1234"
  sensitive   = true
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "key_name" {
  description = "SSH key pair name"
  type        = string
  default     = "mykey"
}
