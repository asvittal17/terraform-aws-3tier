output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main_vpc.id
}

output "vpc_cidr" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.main_vpc.cidr_block
}

output "public_subnet_id" {
  description = "ID of the public subnet"
  value       = aws_subnet.public_subnet.id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = [aws_subnet.private_subnet.id, aws_subnet.private_subnet_2.id]
}

output "web_server_public_ip" {
  description = "Public IP of the web server"
  value       = aws_instance.web.public_ip
}

output "app_server_private_ip" {
  description = "Private IP of the app server"
  value       = aws_instance.app.private_ip
}

output "database_endpoint" {
  description = "Database connection endpoint"
  value       = aws_db_instance.db.endpoint
}

output "nat_gateway_ip" {
  description = "Elastic IP for NAT Gateway"
  value       = aws_eip.nat_eip.public_ip
}