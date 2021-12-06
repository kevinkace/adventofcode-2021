lines = []
sample = ""

with open("./sample.txt") as f:
    sample = f.read()

lines = sample.split("\r\n\r\n")
count = 0
for line in lines:
    count +=1
    print(f'line {count}: {line}')