resource "aws_db_subnet_group" "db_subnet_group" {
  name = "my-db-subnet-group"

  subnet_ids = [
  aws_subnet.private_subnet.id,
  aws_subnet.private_subnet_2.id
]

  tags = {
    Name = "DBSubnetGroup"
  }
}

resource "aws_db_instance" "db" {
  identifier = "mydatabase"

  engine         = "mysql"
  instance_class = "db.t3.micro"
  allocated_storage = 20

  username = "admin"
  password = "Admin1234"

  db_subnet_group_name = aws_db_subnet_group.db_subnet_group.name

  vpc_security_group_ids = [aws_security_group.web_sg.id]

  skip_final_snapshot = true

  tags = {
    Name = "Terraform-DB"
  }
}