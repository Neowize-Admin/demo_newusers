import os

outfile = open("site_all.js", "w")
files = sorted(os.listdir('.'), key=len, reverse=False)
files = [x for x in files if x.endswith(".js") and x != "site_all.js"]
print files

for filename in files:
    outfile.write(open(filename, "r").read() + "\n\n")

outfile.close()
