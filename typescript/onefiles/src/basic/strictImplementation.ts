interface UseNameIfExists {
  use(name?: string): string;
}

class UseName implements UseNameIfExists {
  use(name: string): string {
    return name || "foo";
  }
}

console.log(new UseName().use("bar"));