resource "aws_instance" "web" {
  ami = "ami-0f5ee92e2d63afc18"   # Amazon Linux (ap-south-1)
  instance_type = "t2.micro"

subnet_id = aws_subnet.public_subnet.id
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  associate_public_ip_address = true
  

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install httpd -y
              systemctl start httpd
              systemctl enable httpd
              echo "<h1>Terraform Automated Web Server 🚀</h1>" > /var/www/html/index.html
              EOF

  tags = {
    Name = "Terraform-WebServer"
  }
}