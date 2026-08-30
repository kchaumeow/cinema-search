import { Button, Flex, IconButton, Input, Select } from "@chakra-ui/react";
import { useFilters } from "../hooks/useFilters";
import { Field, MediaType } from "../types";
import { Search2Icon } from "@chakra-ui/icons";

const ratings = [
  { label: "18+", value: "18" },
  { label: "16+", value: "16" },
  { label: "12+", value: "12" },
  { label: "6+", value: "6" },
  { label: "0+", value: "0" },
];

type FiltersProps = {
  genres: Field[];
  countries: Field[];
  mediaType: MediaType;
  onClickSearch: () => void;
};
export default function Filters({
  genres,
  countries,
  mediaType,
  onClickSearch,
}: FiltersProps) {
  const { filters, setAllFilters, resetFilters } = useFilters();
  const { genre, country, year, ageRating } = filters;

  return (
    <Flex gap={3} align="center" flexWrap="wrap" w="100%">
      <Select
        size="sm"
        w="44"
        value={genre}
        onChange={(e) =>
          setAllFilters({ country, genre: e.target.value, year, ageRating })
        }
      >
        <option value="">Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </Select>
      <Select
        size="sm"
        w="44"
        value={country}
        onChange={(e) =>
          setAllFilters({ country: e.target.value, genre, year, ageRating })
        }
      >
        <option value="">Country</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </Select>
      {/* Discover only filters certifications for films. */}
      {mediaType === "movie" && (
        <Select
          size="sm"
          w="44"
          value={ageRating}
          onChange={(e) =>
            setAllFilters({ country, genre, year, ageRating: e.target.value })
          }
        >
          <option value="">Age rating</option>
          {ratings.map((rating) => (
            <option key={rating.value} value={rating.value}>
              {rating.label}
            </option>
          ))}
        </Select>
      )}
      <Input
        size="sm"
        w="32"
        borderRadius="lg"
        placeholder="Year"
        type="text"
        value={year}
        onChange={(e) =>
          setAllFilters({ country, genre, year: e.target.value, ageRating })
        }
      />
      <IconButton
        aria-label="Search"
        icon={<Search2Icon />}
        size="sm"
        onClick={onClickSearch}
      />
      <Button variant="ghost" size="sm" onClick={resetFilters}>
        Reset
      </Button>
    </Flex>
  );
}
