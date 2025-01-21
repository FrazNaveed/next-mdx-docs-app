import fs from "node:fs";
import path from "node:path";

type Metadata = {
  title: string;
  description?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content: content };
}

function getMDXFiles(dir: fs.PathLike) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: fs.PathOrFileDescriptor) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: fs.PathLike) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir.toString(), file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getDocs() {
  const docsDirectory = path.join(process.cwd(), "app", "content");

  // Call a helper function to read all files recursively
  const allFiles = getAllFilesRecursively(docsDirectory);

  // Filter MDX files and extract data
  const docs = allFiles
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const fileContent = fs.readFileSync(file, "utf-8");
      const relativePath = path.relative(docsDirectory, file); // Get relative path for slug
      const slug = relativePath.replace(/\\/g, "/").replace(/\.mdx$/, ""); // Normalize and remove extension
      const { metadata, content } = parseFrontmatter(fileContent);

      return { slug, metadata, content };
    });

  return docs;
}

// Helper function to read all files recursively
function getAllFilesRecursively(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.map((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getAllFilesRecursively(fullPath) : fullPath;
  });

  return files.flat(); // Flatten the array of arrays
}
